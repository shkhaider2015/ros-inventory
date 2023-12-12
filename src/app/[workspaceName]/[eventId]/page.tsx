import HomeScreen from "@/screens/Home";
import axios from "axios";
import { Suspense } from "react";

async function getData(eventId:string) {
  const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
  //   const res = await fetch(URL, {...obj});
console.log("Event Id ", eventId);

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

    const data = await res.data;
    return  data
  } catch (error) {
    console.log("Error : ", error);
    return null
  }

}

export default async function Inventory(params:IInventory) {
    // console.log("Data : ", params);
  const data = await getData(params.params.eventId);
  console.log("Data : ", data);
  
  return (
    <Suspense>
      <HomeScreen workspaceInfo={data?.workspaceInfo?.[0]} items={data?.items} />
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
