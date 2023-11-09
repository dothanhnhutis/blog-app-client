import { httpExternal } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data } = await httpExternal.get("/users");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
