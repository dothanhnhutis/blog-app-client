import { ImageRes } from "@/common.type";
import { authOptions } from "@/lib/auth";
import { httpExternal, isAxiosError } from "@/lib/http";
import { isBase64DataURL } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers: { [index: string]: any } = {};
    const session = await getServerSession(authOptions);
    if (session) {
      headers["x-token"] = session.user.token;
    }
    if (body.data && body.data.length > 0 && isBase64DataURL(body.data)) {
      const { data } = await httpExternal.post<ImageRes>(`/images`, body, {
        headers,
      });
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json({ message: "upload image fail" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
