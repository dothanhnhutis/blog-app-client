import Link from "next/link";
import React from "react";

const PostPage = () => {
  return (
    <div>
      <Link href="/manager/posts/create">create</Link>
    </div>
  );
};

export default PostPage;
