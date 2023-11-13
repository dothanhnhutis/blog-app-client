import { authOptions } from "@/lib/auth";
import { httpExternal } from "@/lib/http";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const headers: { [index: string]: any } = {};
    const session = await getServerSession(authOptions);
    if (session) {
      headers["x-token"] = session.user.token;
    }
    const { data } = await httpExternal.get("/users/me", {
      headers,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.response);
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
