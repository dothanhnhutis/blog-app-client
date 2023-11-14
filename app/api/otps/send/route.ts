import { httpExternal } from "@/lib/http";
import { signJWT } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = signJWT(body, process.env.NEXTAUTH_SECRET!);
    const { data } = await httpExternal.post<{ message: string }>(
      "/otps/send",
      { token }
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
  }
}
