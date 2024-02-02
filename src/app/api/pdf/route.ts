import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import handlebars from "handlebars";
import axios from "axios";
import { fileExtensionImages } from "@/lib/func";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";

const eventId = "a7219297-bee3-4099-98d3-935689927d7f";

const convertToHTML = (description: string) => {
  try {
    if (description.length <= 0) return "";
    let contentState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(description))
    );

    let content = draftToHtml(convertToRaw(contentState.getCurrentContent()));

    return content;
  } catch (e) {
    return description;
  }
};

const convertAllToHtml = (data: any) => {
  const fields = [
    "workspaceInfo",
    "about_venue",
    "insurance_requirement",
    "food_and_beverage",
    "misc",
  ];

  const arrays = ["kitchen_items", "venue_specification"];

  fields.forEach((field) => {
    if (data[field] && data[field].description) {
      data[field].description = convertToHTML(data[field].description);
    }
  });

  arrays.forEach((array) => {
    if (data[array] && Array.isArray(data[array])) {
      data[array].forEach((item: any) => {
        if (item.description) {
          item.description = convertToHTML(item.description);
        }
      });
    }
  });
};

export async function GET(req: Request, res: Response) {
  try {
    let data = await getData(eventId);

    const aboutVenue = data?.items.filter(
      (item: any) => item.type === "ABOUT_THE_VENUE"
    );
    const insuranceRequirements = data?.items.filter(
      (item: any) => item.type === "INSURANCE_REQUIREMENTS"
    );
    const foodAndBeverage = data?.items.filter(
      (item: any) => item.type === "FOOD_AND_BEVERAGE"
    );
    const misc = data?.items.filter((item: any) => item.type === "MISC");

    const returnString = (stringToReturn: string | undefined | null) =>
      stringToReturn ? stringToReturn : "";

    const pdfData: IData = {
      workspaceInfo: {
        description: returnString(data?.workspaceInfo.description),
        image: returnString(data?.workspaceInfo?.logo_url)
      },
      eventInfo: { name: data?.eventInfo.name, end: moment(data?.eventInfo.end).format("MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A") },
      contacts: data?.contacts,
      about_venue: {
        description: returnString(aboutVenue[0].description),
      },
      insurance_requirement: {
        description: returnString(insuranceRequirements[0].description),
      },
      food_and_beverage: {
        description: returnString(foodAndBeverage[0].description),
      },
      misc: {
        description: returnString(misc[0].description),
      },
      venue_specification: data?.items?.filter(
        (item: any) => item.type === "VENUE_SPEC"
      ),
      event_items: data?.items.filter(
        (item: any) => item.type === "INVENTORY_MENU"
      ),
      kitchen_items: data?.items?.filter(
        (item: any) => item.type === "KITCHEN_SUPPLY"
      ),
      checked_out_items: data?.cart_items?.map((item:any) => ({...item, total_price: item?.selectedQuantity * item?.rental_price})),
    };

    convertAllToHtml(pdfData);

    let fileName = await createPDF(pdfData);
    // console.log("fileName", fileName);

    return NextResponse.json(
      {
        message: `/pdf/${"fileName"}`,
        data: pdfData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error :: ", error);
    return NextResponse.json(
      { message: "Error accours : ", error: error },
      { status: 500 }
    );
  }
}

async function createPDF(data: any) {
  try {
    const templateHtml = fs.readFileSync(
      path.join(process.cwd() + "/public/template", "index.html"),
      "utf8"
    );
    // let to_html = null

    // let contentState = EditorState.createWithContent(
    //   convertFromRaw(JSON.parse(data))
    // );

    // let content = draftToHtml(convertToRaw(contentState.getCurrentContent()));

    const template = handlebars.compile(templateHtml);
    const html = template({ data });

    console.log("HTML ", html);
    // console.log("Data : ", data);

    let milis: any = new Date();
    milis = milis.getTime();

    const fileName = `file-${milis}.pdf`.replace(/\s/g, "-");
    const pdfPath = path.join(process.cwd(), "public", "pdf", fileName);

    const options = {
      width: "800px",
      headerTemplate: "<p>some head</p>",
      footerTemplate: "<p>some foot</p>",
      displayHeaderFooter: true,
      margin: {
        top: "10px",
        bottom: "30px",
      },
      printBackground: true,
      path: pdfPath,
    };

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: ["domcontentloaded", "networkidle0"],
    });

    await page.pdf(options);

    await browser.close();

    return fileName;
  } catch (err) {
    console.error(err);
  }
}

async function getData(eventId: string) {
  const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
  const image_url =
    "https://ros-rosbucket221548-newdev.s3.amazonaws.com/public/";
  const client_file_url =
    "https://ros-rosbucket221548-newdev.s3.amazonaws.com/inventory/";
  const Spec_Icons: string[] = [
    "/images/icons/flash.svg",
    "/images/icons/lightning.svg",
    "/images/icons/wifi.svg",
    "/images/icons/tec_spec.svg",
  ];
  //   const res = await fetch(URL, {...obj});
  // console.log("Event Id ", eventId);

  try {
    const res = await axios.post(
      URL,
      {
        eventId: eventId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await res.data;
    // console.log("Data at server : ", data);
    // console.log("Error : ");

    let {
      workspaceInfo,
      items,
      social_media,
      contacts,
      eventInfo,
      attachments,
      checkout_client_info,
      cart_items,
    } = data;
    workspaceInfo = workspaceInfo[0];

    workspaceInfo = {
      ...workspaceInfo,
      logo_url: image_url + workspaceInfo?.logo_url,
    };

    items = items?.map((item: any) => ({
      ...item,
      icon_url: image_url + item?.icon_url,
      event_id: eventId,
    }));

    // set spec icons
    items = items?.map((item: any) => {
      if (item?.type === "VENUE_SPEC") {
        let itemX = item;
        if (itemX?.name?.toLowerCase()?.includes("lighting")) {
          itemX = {
            ...itemX,
            icon_url: Spec_Icons[1],
          };
        } else if (itemX?.name?.toLowerCase()?.includes("technical")) {
          itemX = {
            ...itemX,
            icon_url: Spec_Icons[3],
          };
        } else if (itemX?.name?.toLowerCase()?.includes("power")) {
          itemX = {
            ...itemX,
            icon_url: Spec_Icons[0],
          };
        } else if (itemX?.name?.toLowerCase()?.includes("wifi")) {
          itemX = {
            ...itemX,
            icon_url: Spec_Icons[2],
          };
        } else {
          itemX = itemX;
        }
        return itemX;
      } else return item;
    });

    items = items?.map((item: any) => {
      let additional_images = item.additional_images;

      try {
        additional_images = JSON.parse(additional_images);
        if (additional_images.images && additional_images.images.length) {
          additional_images.images = additional_images.images.map(
            (item: string) => image_url + item
          );
        }
        // return {...item, additional_images}
      } catch (error) {
        additional_images = {
          images: [],
        };
      } finally {
        return { ...item, additional_images };
      }
    });

    // filter social media
    social_media = social_media?.map(({ __typename, ...item }: any) => {
      let itemX = item;
      let iconURL = _getIconUrl(item?.platform_name);
      itemX = { ...itemX, icon: iconURL };
      return itemX;
    });

    // filter contacts
    contacts = contacts?.map(({ __typename, ...item }: any) => item);
    // contacts = contacts.filter((_:any, ind:number) => ind%2 === 0)

    // Event Info
    eventInfo = {
      id: eventInfo?.id,
      name: eventInfo?.name,
      location: eventInfo?.location,
      start: eventInfo?.starts,
      end: eventInfo?.ends,
      link: `${"https://my.runofshowapp.com/"}/events/${
        eventInfo?.id
      }/events-details`,
      ...eventInfo,
    };

    // filter checkout info
    if (checkout_client_info?.length > 0)
      checkout_client_info = checkout_client_info[0];

    // filter cartItems
    cart_items = cart_items.map((item: any) => {
      let itemX = item;
      let itemFromList = items?.find((itemY: any) => itemY?.id === itemX?.item);
      itemFromList = {
        ...itemFromList,
        rental_price: itemX?.unit_price_when_purchased,
        selectedQuantity: itemX?.quantity,
        cart_id: itemX.id,
      };

      return itemFromList;
    });

    // filter attachements
    attachments = attachments?.map((item: any) => {
      let itemX = item;
      let extension = _getExtension(item?.name);

      // Access url is change for client side
      if (itemX?.uploaded_via === "CLIENT")
        itemX.url = client_file_url + itemX?.url + "." + extension;
      else itemX.url = image_url + itemX?.url;

      itemX.file_logo = fileExtensionImages[item?.file_type];

      return itemX;
    });

    return {
      workspaceInfo,
      items,
      eventInfo,
      social_media,
      contacts,
      attachments,
      checkout_client_info,
      cart_items,
      event_id: eventId,
    };
  } catch (error) {
    // console.log("Error at server : ", error);
    return null;
  }
}

function _getIconUrl(platform: string): string {
  let final_url = null;

  switch (platform.toLowerCase()) {
    case "facebook":
      final_url = "/images/socials/facebook.png";
      break;
    case "twitter":
      final_url = "/images/socials/twitter.png";
      break;
    case "instagram":
      final_url = "/images/socials/Instagram.png";
      break;
    case "thread":
      final_url = "/images/socials/thread.png";
      break;
    case "snapchat":
      final_url = "/images/socials/Snapchat.png";
      break;
    case "pinterest":
      final_url = "/images/socials/Pinterest.png";
      break;
    default:
      final_url = platform || "";
      break;
  }

  return final_url;
}

function _getExtension(uri: string): string {
  let splitData = uri.split(".");
  let extension = splitData[splitData.length - 1];

  return extension;
}

interface IData {
  workspaceInfo: {
    description: string;
    image: string;
  };
  eventInfo: {
    name: string;
    end: string;
  };
  contacts: [];
  about_venue: {
    description: string;
  };
  insurance_requirement: {
    description: string;
  };
  food_and_beverage: {
    description: string;
  };
  misc: {
    description: string;
  };
  venue_specification: [];
  event_items: [];
  kitchen_items: [];
  checked_out_items: [];
}
