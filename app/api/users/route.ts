import { httpExternal } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const headers: { [index: string]: any } = {};
    const session = await getServerSession(authOptions);
    if (session) {
      headers["x-token"] = session.user.token;
    }
    const { data } = await httpExternal.get("/users", {
      headers,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.response);
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
