import { httpExternal } from "@/lib/http";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { data } = await httpExternal.get<
      {
        id: string;
        name: string;
        slug: string;
        _count: {
          post: number;
        };
      }[]
    >("/tags");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("next-auth.session-token");
    const headers: { [index: string]: any } = {};
    if (session) {
      headers["x-token"] = session.value;
    }
    const body = await request.json();
    const { data } = await httpExternal.post("/tags", body, { headers });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
