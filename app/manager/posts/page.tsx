import Link from "next/link";
import React from "react";

const PostPage = () => {
  return (
    <div>
      <Link href="/manager/posts/create">create</Link>
      <div className="h-[1000px]">asd</div>
    </div>
  );
};

export default PostPage;
