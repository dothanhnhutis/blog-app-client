// "use client";
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
import Modal from "@/components/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreatePostModel = async () => {
  // const router = useRouter();
  const session = await getServerAuthSession();
  const k: number = 1;

  return k == 1 ? (
    <Modal>
      <Card className="sm:rounded-lg md:w-full lg:max-w-screen-lg grid w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm session={session} />
        </CardContent>
      </Card>
    </Modal>
  ) : (
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
