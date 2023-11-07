"use client";
import React from "react";
import { LogOut, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import AvatarDefault from "@/images/user-1.jpg";
import { SessionInterface } from "@/common.type";

const UserMenu = ({ session }: { session: SessionInterface }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.avatarUrl ?? AvatarDefault.src} />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-[360px]">
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={session?.user?.avatarUrl ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="w-24 h-24 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p className="font-medium text-lg">
              {session?.user?.username ?? "error"}
            </p>
            <p className="font-light text-sm text-gray-500">
              {`${session?.user?.role ?? "error"}`}
            </p>
            <div className="flex items-center space-x-2 text-gray-500 w-full">
              <Mail size={16} />
              <p className="text-sm truncate">{`${
                session?.user?.email ?? "error"
              }`}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
