import NotFoundData from "@/screens/NotFoundData";
import { Suspense } from "react";

export default async function Home({ searchParams }: IHome) {
  return (
    <Suspense>
      <NotFoundData />
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
