import { authOptions } from "@/lib/auth";
import { httpExternal } from "@/lib/http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers: { [index: string]: any } = {};
    const session = await getServerSession(authOptions);
    if (session) {
      headers["x-token"] = session.user.token;
    }
    const { data } = await httpExternal.post("/posts", body, {
      headers,
    });
    console.log(1);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data } = await httpExternal.get("/posts");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
