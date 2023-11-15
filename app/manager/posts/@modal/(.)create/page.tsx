import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { getServerAuthSession } from "@/lib/auth";

const CreatePostModel = async () => {
  // const router = useRouter();
  const session = await getServerAuthSession();

  return (
    <Dialog defaultOpen={true}>
      <DialogContent
        // className="overflow-y-scroll h-screen xl:max-w-7xl"
        className="lg:max-w-screen-lg overflow-y-scroll max-h-screen"
        // onCloseAutoFocus={() => {
        //   router.back();
        // }}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <PostForm session={session} />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModel;
