import React from "react";
import Image from "next/image";
import MediaChatImage from "@/images/mediachat.png";

const PostLayout = async ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div className="flex-auto xl:max-w-7xl xl:mx-auto px-6 pb-4 pt-3">
      <div className="flex flex-col flex-grow">
        <div className="relative flex-col hidden lg:flex flex-shrink-0 bg-[#ecf2ff] dark:bg-primary-foreground rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
          <h4 className="font-semibold text-2xl">User</h4>
          <h6 className="font-normal text-lg">Manage your user</h6>
          <div className="absolute right-[20px] top-0 w-[165px] h-[165px]">
            <Image priority src={MediaChatImage} alt="mediachat" />
          </div>
        </div>
        {children}
        {modal}
      </div>
    </div>
  );
};

export default PostLayout;
