import moment, { tz } from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqData = await request.json();
  const client_time_zone = reqData.client_time_zone;
  const serverTimezone = "UTC";
  const eventStart = "2024-04-01T13:48:50.667+00:00";
  const eventEnd = "2024-04-30T13:48:53.048+00:00";
  const serverStartDateTime = tz(eventStart, serverTimezone)
    .clone()
    .tz(client_time_zone);
  // const clientDateTime = serverDateTime.clone().tz(client_time_zone)
  const serverEndDateTime = tz(eventEnd).clone().tz(client_time_zone);

  return NextResponse.json(
    {
      message: "success",
      client_time_zone,
      eventStart: moment(eventStart).format(
        "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
      ),
      eventEnd: moment(eventEnd).format(
        "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
      ),
      serverStartDateTime: serverStartDateTime.format(
        "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
      ),
      serverEndDateTime: serverEndDateTime.format(
        "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
      ),
    },
    { status: 200 }
  );
}
