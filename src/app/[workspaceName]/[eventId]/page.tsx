import HomeScreen from "@/screens/Home";
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
    let { workspaceInfo, items } = data;
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

    return {
      workspaceInfo,
      items,
    };
  } catch (error) {
    console.log("Error : ", error);
    return null;
  }
}

export default async function Inventory(params: IInventory) {
  const data = await getData(params.params.eventId);
  // console.log("Data : ", data);

  return (
    <Suspense>
      <HomeScreen
        workspaceInfo={data?.workspaceInfo}
        items={data?.items || []}
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
