import { PostForm } from "@/components/PostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const EditPost = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit post</CardTitle>
        <CardDescription>Create new post now</CardDescription>
      </CardHeader>
      <CardContent>
        <PostForm
          session={{
            id: "",
            avatarUrl: "",
            email: "",
            name: "",
            role: "Admin",
            username: "",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default EditPost;
