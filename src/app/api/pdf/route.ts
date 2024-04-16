import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import * as path from "path";
// import puppeteer from "puppeteer";
import handlebars from "handlebars";
import axios from "axios";
import { fileExtensionImages } from "@/lib/func";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import { NextApiRequest } from "next";
import Chromium from "chrome-aws-lambda";
// import {Puppeteer as pptr} from 'puppeteer-core'

// let chrome:any = {};
// let puppeteer:any;

// if(process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   chrome = require('chrome-aws-lambda');
//   puppeteer = require('puppeteer-core');
// } else {
//   puppeteer = require('puppeteer');
// }

// ? 2nd method
// const signed_documents = data?.attachments
//   .filter((item) => item.section_type === "SIGNED_DOCUMENTS_SECTION")
//   .map((signedDoc) => ({
//     ...signedDoc,
//     completed: data?.attachments.find((att) => att.document_id === signedDoc.id)
//       ?.completed,
//   }));

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

const location_icon2 = "http://localhost:3005/images/icons/Pin_light_purple.png"
const location_icon = "https://inventory.runofshowapp.com/images/icons/Pin_light_purple.png"

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

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqData = await request.json();

    const eventId = reqData.event_id;
    const currentDate = reqData.current_date;

    if (!eventId || eventId === "") {
      return NextResponse.json(
        {
          message: "Event id is required here",
        },
        { status: 400 }
      );
    }
    if (!currentDate || currentDate === "") {
      return NextResponse.json(
        {
          message: "Current date is required here",
        },
        { status: 400 }
      );
    }

    let data = await getData(eventId);

    if (!data) {
      return NextResponse.json(
        {
          message: "Event id is not valid",
        },
        { status: 400 }
      );
    }

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

    let sum_rental_price = 0;
    const total_rental_price = data?.cart_items.forEach((item: any) => {
      sum_rental_price += item?.rental_price;
      return sum_rental_price;
    });

    const signed_documents = data?.attachments.filter(
      (item: any) => item.section_type === "SIGNED_DOCUMENTS_SECTION"
    );

    signed_documents.forEach((item1: any) => {
      return data?.document_status.forEach((item2: any) => {
        if (item1.id === item2.document_id) {
          item1.completed = item2.completed;
        }
      });
    });

    const returnString = (stringToReturn: string | undefined | null) =>
      stringToReturn ? stringToReturn : "";

    const pdfData: IData = {
      workspaceInfo: {
        description: returnString(data?.workspaceInfo.description),
        image: returnString(data?.workspaceInfo?.logo_url),
        address: data?.workspaceInfo?.secondary_email_address,
        addressIcon: location_icon
      },
      eventInfo: {
        name: data?.eventInfo.name,
        start: moment(data?.eventInfo.start).format(
          "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
        ),
        end: moment(data?.eventInfo.end).format(
          "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
        ),
        location: data?.eventInfo.location,
      },
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
      checked_out_items: data?.cart_items?.map((item: any) => ({
        ...item,
        total_price: item?.selectedQuantity * item?.rental_price,
      })),
      signed_documents: signed_documents,
      checkout_client_info: {
        expected_guest_count: data?.checkout_client_info.expected_guest_count,
        checkin_at_door: data?.checkout_client_info.checkin_at_door,
      },
      sum_rental_price: sum_rental_price,
    };

    

    convertAllToHtml(pdfData);

    let pdfBuffer = await createPDF({...pdfData, location_icon});
    const header = new Headers();
    header.append(
      "Content-Disposition",
      "attachment; filename=inventory-data.pdf"
    );
    header.append("Content-Type", "application/pdf");
    header.append("Access-Control-Allow-Origin", "*");

    return new Response(pdfBuffer, {
      headers: header,
    });
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

    const template = handlebars.compile(templateHtml);
    const html = template({ data });

    // console.log("HTML ", html);

    let milis: any = new Date();
    milis = milis.getTime();

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
    };

    const browser = await Chromium.puppeteer.launch({
      args: [
        ...Chromium.args,
        "--hide-scrollbars",
        "--disable-web-security",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      defaultViewport: Chromium.defaultViewport,
      executablePath: await Chromium.executablePath,
      // executablePath: '/usr/bin/chromium-browser',
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: ["domcontentloaded", "networkidle0"],
    });

    let pdfBuffer = await page.pdf(options);

    await browser.close();

    return pdfBuffer;
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
      document_status,
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
      document_status,
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
    address: string;
    addressIcon: string;
  };
  eventInfo: {
    name: string;
    start: string;
    end: string;
    location: string;
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
  signed_documents: [];
  checkout_client_info: {
    expected_guest_count: number;
    checkin_at_door: number;
  };
  sum_rental_price: number;
}
