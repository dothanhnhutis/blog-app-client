import { httpExternal } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";

// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { data } = await httpExternal.post("/tags", body);
//     return NextResponse.json(data, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
//   }
// }

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

// export async function DELETE(request: NextRequest) {
//   try {
//     // const queries = request.
//     const body = await request.json();
//     const { data } = await httpExternal.post("/tags", body);
//     return NextResponse.json(data, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ ok: "something went wrong" }, { status: 500 });
//   }
// }
