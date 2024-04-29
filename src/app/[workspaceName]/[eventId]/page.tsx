import { fileExtensionImages } from "@/lib/func";
import HomeScreen from "@/screens/Home";
import NotFoundData from "@/screens/NotFoundData";
import axios from "axios";
import { Suspense } from "react";

const images: string[] = [
  "https://dummyimage.com/1200x800/d99400/fff&text=Carousel",
  "https://dummyimage.com/1200x800/0bd900/fff&text=Carousel",
  "https://dummyimage.com/1200x800/0050d9/fff&text=Carousel",
  "https://dummyimage.com/1200x800/d90019/fff&text=Carousel",
  "https://dummyimage.com/1200x800/db00db/fff&text=Carousel",
  "https://dummyimage.com/1200x800/00d9ce/fff&text=Carousel",
];

const sectionIds = {
  FIRST: "05f6e36e-77e2-4c8e-91ed-f3f6152b4e0f",
  SECOND: "5b4c3e52-b4c4-41bb-8377-372033521725",
  THIRED: "ae6e366a-37c8-4be2-b4a9-ef67e6883a34",
  FOURTH: "3e0b14da-baea-4880-bcb6-b1506a350b46",
  FIFTH: "c6e290cc-215d-4459-b8ce-287b2e6de350",
  SIXTH: "532140d7-7bc3-4669-ad79-088395ce3f27",
  SEVENTH: "41fbdc41-eaa0-4d2d-939b-ed955518502e",
  EIGTH: "bb19bfcd-72a1-4980-8bf0-65a582acadf3",
  NINTH: '61561cc6-dd97-44ea-94a0-882d423e1696'
};

const sectionTitleData: ISectionTitle[] = [
  {
    section_uuid: sectionIds.FIRST,
    section_title: "About The Venue",
  },
  {
    section_uuid: sectionIds.SECOND,
    section_title: "Inventory Menu",
  },
  {
    section_uuid: sectionIds.THIRED,
    section_title: "Kitchen (if applicable)",
  },
  {
    section_uuid: sectionIds.FOURTH,
    section_title: "Insurance Requirements",
  },
  {
    section_uuid: sectionIds.FIFTH,
    section_title: "Food & Beverage",
  },
  {
    section_uuid: sectionIds.SIXTH,
    section_title: "Misc",
  },
  {
    section_uuid: sectionIds.SEVENTH,
    section_title: "Signed Documents",
  },
  {
    section_uuid: sectionIds.EIGTH,
    section_title: "Client / Planner Attachments",
  },
  {
    section_uuid: sectionIds.NINTH,
    section_title: "Questions",
  },
];

export async function getData(eventId: string) {
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
    "/images/icons/HandHeart.svg",
  ];

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
      section_titles,
      document_status,
      questions
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
          itemX = {
            ...itemX,
            icon_url: Spec_Icons[4],
          };
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

    // cart_items = cart_items.filter((item:any) => !item.is_deleted && item?.selectedQuantity > 0 )

    // filter attachements
    attachments = attachments?.map((item: any) => {
      let itemX = item;
      let extension = _getExtension(item?.name);

      // Access url is change for client side
      if (itemX?.uploaded_via === "CLIENT")
        itemX.url = client_file_url + itemX?.url + "." + extension;
      else if (
        !(itemX?.url?.includes("inventory") && itemX?.url?.includes("file"))
      )
        itemX?.url;
      else itemX.url = image_url + itemX?.url;

      itemX.file_logo = fileExtensionImages[item?.file_type];

      return itemX;
    });

    let newTitles = {
      FIRST: "About The Venue",
      SECOND: "Inventory Menu",
      THIRED: "Kitchen (if applicable)",
      FOURTH: "Insurance Requirements",
      FIFTH: "Food & Beverage",
      SIXTH: "Misc",
      SEVENTH: "Signed Documents",
      EIGTH: "Client / Planner Attachments",
      NINTH: 'Questions'
    };
    // filter section titles
    if (section_titles && section_titles?.length <= 0)
      section_titles = sectionTitleData;

    if (section_titles && section_titles?.length > 0) {
      section_titles?.forEach((item: ISectionTitle) => {
        switch (item?.section_uuid) {
          case sectionIds.FIRST:
            newTitles.FIRST = item.section_title;
            break;
          case sectionIds.SECOND:
            newTitles.SECOND = item.section_title;
            break;
          case sectionIds.THIRED:
            newTitles.THIRED = item.section_title;
            break;
          case sectionIds.FOURTH:
            newTitles.FOURTH = item.section_title;
            break;
          case sectionIds.FIFTH:
            newTitles.FIFTH = item.section_title;
            break;
          case sectionIds.SIXTH:
            newTitles.SIXTH = item.section_title;
            break;
          case sectionIds.SEVENTH:
            newTitles.SEVENTH = item.section_title;
            break;
          case sectionIds.EIGTH:
            newTitles.EIGTH = item.section_title;
            break;
          case sectionIds.NINTH:
            newTitles.NINTH = item.section_title;
            break;
          default:
            break;
        }
      });
    }

    // filter is_deletd items 
    items = items?.filter((item:any) => !item?.is_deleted)

    // filter is_deleted item from cart
    cart_items = cart_items?.filter((item:any) => {
      if(item?.is_deleted) {
        if(item?.selectedQuantity <= 0) return false
        else return true
      }
      else return true
    })

    // filter questions
    questions = questions?.map(({__typename, options, ...item}:any) => {
      let itemX:any = item;
      itemX.options = options?.map(({__typename, ...itemY}:any) => itemY)
      return itemX;
    })

    questions = questions?.reverse();

    questions = questions?.map((item:any) => {
      let itemX = item;
      let answers = itemX?.workspace_inventory_question_answers;
      let options = itemX?.options;

      options = options.map((opt:any) => {
        if(answers?.length > 0 && answers?.some((i:any) => i?.selected_option_id === opt?.id)) {
          return {
            ...opt,
            checked: true
          }
        } else {
          return {
            ...opt,
            checked: false
          }
        }
      })

      if(answers?.length > 0) {
        let txt_answer = '';
        answers?.forEach((ii:any) => {
          txt_answer = ii?.text_answer;
        })
        return {
          ...itemX,
          options,
          answer: txt_answer
        }
      } else {
        return {
          ...itemX,
          options,
          answer: ''
        }
      }

    })


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
      newTitles,
      document_status,
      questions
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

export default async function Inventory(params: IInventory) {
  const data = await getData(params.params.eventId);
  // console.log("guest ", data?.checkout_client_info);
  console.log("items additional_images ");

  if (!data)
    return (
      <Suspense>
        <NotFoundData />
      </Suspense>
    );

  return (
    <Suspense>
      <HomeScreen
        workspaceInfo={data?.workspaceInfo}
        items={data?.items || []}
        eventInfo={data?.eventInfo}
        contacts={data?.contacts}
        socialMedia={data?.social_media}
        attachements={data?.attachments}
        guest_info={data.checkout_client_info}
        cart_items={data.cart_items}
        event_id={data?.event_id}
        section_titles={data.newTitles}
        documentStatus={data.document_status}
        questions={data.questions}
      />
    </Suspense>
  );
}

interface IInventory {
  params: {
    workspaceid: string;
    eventId: string;
  };
  searchParams: any;
}

export interface ISectionTitle {
  section_uuid: string;
  section_title: string;
  id?: string;
  workpsace_id?: string;
}
