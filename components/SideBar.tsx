"use client";
import { Transition } from "@headlessui/react";

import {
  ChevronDown,
  CircleIcon,
  ClipboardSignatureIcon,
  Settings,
  Tags,
  User,
  UsersIcon,
} from "lucide-react";
import { Label } from "./ui/label";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-full overscroll-y-auto w-full bg-popover text-popover-foreground ">
      <div className="p-1">
        <Label className="text-xs font-medium">Manager</Label>

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <ClipboardSignatureIcon className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">Post</span>
          <ChevronDown
            className={cn(
              "flex flex-shrink-0 ml-auto w-4 h-4 transition duration-200",
              open ? "rotate-180 " : ""
            )}
          />
        </div>
        <Transition
          as="div"
          className="bg-red-200 transition-[width] ease-out duration-1000"
          show={open}
          enter="  "
          enterFrom="h-0"
          enterTo=" h-300px"
          leave=""
          leaveFrom="h-300px"
          leaveTo=" h-0"
        >
          <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground">
            <CircleIcon className="m-1.5 mr-3.5 h-2 w-2" />
            <span className="text-base font-normal">Post</span>
          </div>
          <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground">
            <CircleIcon className="m-1.5 mr-3.5 h-2 w-2" />
            <span className="text-base font-normal">Post</span>
          </div>
          <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground">
            <CircleIcon className="m-1.5 mr-3.5 h-2 w-2" />
            <span className="text-base font-normal">Post</span>
          </div>
        </Transition>

        <Link
          href="/manager/posts"
          className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <ClipboardSignatureIcon className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">Post</span>
        </Link>
        <Link
          href="/manager/tags"
          className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Tags className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">Tag</span>
        </Link>
        <Link
          href="/manager/users"
          className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <UsersIcon className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">User</span>
        </Link>
      </div>

      <div className="p-1">
        <Label className="text-xs font-medium">User</Label>
        <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground">
          <User className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">Profile</span>
        </div>
        <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground">
          <Settings className="mr-2 h-5 w-5" />
          <span className="text-base font-normal">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
