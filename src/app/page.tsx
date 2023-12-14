import { Suspense } from "react";

export default async function Home({ searchParams }: IHome) {
  return (
    <Suspense>
      <div>
        <h4>ROS Inventory</h4>
      </div>
    </Suspense>
  );
}

interface IHome {
  params: any;
  searchParams: {
    workspaceid: string;
    eventid: string;
  };
}
