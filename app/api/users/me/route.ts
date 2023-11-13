import { authOptions } from "@/lib/auth";
import { httpExternal } from "@/lib/http";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("next-auth.session-token");
    // console.log(session1?.value);

    const headers: { [index: string]: any } = {};
    // const session = await getServerSession(authOptions);
    // console.log(session);
    if (session) {
      headers["x-token"] = session.value;
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
