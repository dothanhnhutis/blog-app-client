import { httpExternal } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await httpExternal.post<{ message: string }>(
      "/otp/send",
      body
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
