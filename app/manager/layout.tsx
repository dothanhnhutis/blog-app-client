import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import { SwitchMode } from "@/components/SwitchMode";
import UserMenu from "@/components/UserMenu";
import { getServerAuthSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const ManagerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  return (
    <div className="h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b backdrop-blur bg-background/60">
        <nav className="flex justify-between items-center p-2 pr-4 ">
          <Logo />
          <div className="flex items-center space-x-6 ml-6 text-sm font-medium">
            <Link
              prefetch={false}
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>

            <Link
              prefetch={false}
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <SwitchMode />
            <UserMenu session={session} />
          </div>
        </nav>
      </header>
      <div className="flex h-[calc(100vh_-_73px)]">
        <SideBar />
        <div className="flex-auto overflow-y-scroll h-full">{children}</div>
      </div>
    </div>
  );
};

export default ManagerLayout;
