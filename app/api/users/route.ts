import { httpExternal } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("next-auth.session-token");
    const headers: { [index: string]: any } = {};
    if (session) {
      headers["x-token"] = session.value;
    }
    const { data } = await httpExternal.get("/users", {
      headers,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
