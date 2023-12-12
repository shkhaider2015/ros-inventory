import HomeScreen from "@/screens/Home";
import { Suspense } from "react";

async function getData(eventId: string) {
  const URL = "https://myapi.runofshowapp.com/api/inventory/detailsByEventId";
  const obj = {
    method: "POST",
    body: JSON.stringify({
      eventId: "410893c9-ad39-4910-a9b7-4e921c3ac5e5",
    }),
  };
  const res = await fetch(URL);

  return res.json();
}

export default async function Home({ searchParams }:IHome) {
  // const data = await getData(searchParams.eventid);
  // console.log("Data : ", searchParams);
  return <Suspense >
    <div></div>
    {/* <HomeScreen /> */}
  </Suspense>;
}

interface IHome {
  params: any;
  searchParams: {
    workspaceid: string;
    eventid: string;
  };
}
