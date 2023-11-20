import React from "react";
import { http } from "@/lib/http";
import DataTable from "./data-table";
import { columns } from "./columns";

type BlogRes = {
  id: string;
  title: string;
  thumnail: string;
  slug: string;
  content: string;
  tagId: string;
  authorId: string;
  author: {
    username: string;
    avatarUrl: string | null;
  };
  tag: {
    slug: string;
    tagName: string;
  };
};

const PostPage = async () => {
  const { data } = await http.get<BlogRes[]>("/posts");

  return (
    <div className="flex flex-col gap-4">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default PostPage;
