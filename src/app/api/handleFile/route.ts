import axios, { AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  return NextResponse.json(
    {
      message: "Get Re",
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    return NextResponse.json(
      { message: "Only JSON data is accepted" },
      { status: 400 }
    );
  }

  const data: IFileData = await req.json();

  if (!data.workspace_id)
    return NextResponse.json(
      { message: "Workspace_id is required" },
      { status: 400 }
    );
  if (!data.section_type)
    return NextResponse.json(
      { message: "section_type is required" },
      { status: 400 }
    );
  if (!data.file_type)
    return NextResponse.json(
      { message: "file_type is required" },
      { status: 400 }
    );

  let URL = "https://myapi.runofshowapp.com/api/inventory/uploadFileClient";

  try {
    let res:AxiosResponse<{url:string}> = await axios.post(URL, data, {
      headers: {
        "Content-Type": data.file_type,
      },
    });

    return NextResponse.json({ url: res.data.url }, { status: 200 });
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "something wrong happen" },
      { status: 500 }
    );
  }
}

interface IFileData {
  name: string;
  file_type: string;
  file_name: string;
  workspace_id: string | undefined;
  description: string;
  section_type: string | undefined;
}
