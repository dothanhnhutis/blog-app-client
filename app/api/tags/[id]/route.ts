import { httpExternal } from "@/lib/http";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("next-auth.session-token");
    const headers: { [index: string]: any } = {};
    if (session) {
      headers["x-token"] = session.value;
    }

    const body = await request.json();
    const { data } = await httpExternal.patch(`/tags/${params.id}`, body, {
      headers,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await httpExternal.get<{
      id: string;
      name: string;
      slug: string;
      _count: {
        post: number;
      };
    }>(`/tags/${params.id}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("next-auth.session-token");
    const headers: { [index: string]: any } = {};
    if (session) {
      headers["x-token"] = session.value;
    }
    const { data } = await httpExternal.delete(`/tags/${params.id}`, {
      headers,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
