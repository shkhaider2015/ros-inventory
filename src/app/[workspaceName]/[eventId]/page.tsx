import HomeScreen from "@/screens/Home";
import NotFoundData from "@/screens/NotFoundData";
import axios from "axios";
import { Suspense } from "react";

async function getData(eventId: string) {
  const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
  const image_url =
    "https://ros-rosbucket221548-newdev.s3.amazonaws.com/public/";
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

    let eventInfo = {
      id: "94585fb4-7993-43e1-8334-7af65bfdf370",
      name: "Dummy Name - New WS",
      start_date: "November 30, 2023 2:00PM",
      end_date: "January 30, 2023 2:00PM",
    };

    let { workspaceInfo, items, social_media, contacts } = data;
    workspaceInfo = workspaceInfo[0];
    workspaceInfo = {
      ...workspaceInfo,
      logo_url: image_url + workspaceInfo?.logo_url,
    };

    items = items?.map((item: any) => ({
      ...item,
      icon_url: image_url + item?.icon_url,
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

    // filter social media
    social_media = social_media?.map(({ __typename, ...item }: any) => {
      let itemX = item;
      let iconURL = _getIconUrl(item?.platform_name);
      itemX = {...itemX, icon: iconURL}
      return itemX
    });

    // filter contacts
    contacts = contacts?.map(({ __typename, ...item }: any) => item);
    // contacts = contacts.filter((_:any, ind:number) => ind%2 === 0)

    return {
      workspaceInfo,
      items,
      eventInfo,
      social_media,
      contacts,
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
      final_url = platform || '';
      break;
  }

  return final_url;
}

export default async function Inventory(params: IInventory) {
  const data = await getData(params.params.eventId);
  console.log("Social Media ", data?.social_media);

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
