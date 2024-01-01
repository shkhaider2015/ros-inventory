import { fileExtensionImages } from "@/lib/func";
import HomeScreen from "@/screens/Home";
import NotFoundData from "@/screens/NotFoundData";
import axios from "axios";
import { Suspense } from "react";

async function getData(eventId: string) {
  const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
  const image_url =
    "https://ros-rosbucket221548-newdev.s3.amazonaws.com/public/";
  const client_file_url =
    "https://ros-rosbucket221548-newdev.s3.amazonaws.com/";
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

    let eventInfo1 = {
      id: "94585fb4-7993-43e1-8334-7af65bfdf370",
      name: "Dummy Name - New WS",
      start_date: "November 30, 2023 2:00PM",
      end_date: "January 30, 2023 2:00PM",
      link: `${"https://mydev.runofshowapp.com"}/events/${"94585fb4-7993-43e1-8334-7af65bfdf370"}/events-details`,
    };

    let {
      workspaceInfo,
      items,
      social_media,
      contacts,
      eventInfo,
      attachments,
    } = data;
    workspaceInfo = workspaceInfo[0];
    workspaceInfo = {
      ...workspaceInfo,
      logo_url: image_url + workspaceInfo?.logo_url,
    };

    items = items?.map((item: any) => ({
      ...item,
      icon_url: image_url + item?.icon_url,
      event_id: eventId
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
    };

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
  // console.log("Social Media ", data?.attachments);

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
