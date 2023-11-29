import { NextResponse } from "next/server";

export function GET(request) {
  const users = [
    {
      name: "RONAK",
    },
    {
      name: "GAUTAM",
    },
  ];

  return NextResponse.json(users);
}
