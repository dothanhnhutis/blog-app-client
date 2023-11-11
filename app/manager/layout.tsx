import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import { SwitchMode } from "@/components/SwitchMode";
import UserMenu from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServerAuthSession } from "@/lib/auth";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ManagerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  return (
    <>
      <header className="backdrop-saturate-[1.8] sticky top-0 z-50 border-b backdrop-blur bg-background/60">
        <nav className="flex justify-between items-center p-2 pr-4 ">
          <Logo className="hidden md:block" />
          {/* <div className="hidden md:flex items-center space-x-6 ml-6 text-sm font-medium">
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
          </div> */}
          <Button variant="ghost" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
          </Button>

          <div className="flex flex-1 items-center justify-end gap-4">
            <SwitchMode />
            <UserMenu session={session} />
          </div>
        </nav>
      </header>
      <main className="relative flex ">
        <div className="sticky top-[73px] h-[calc(100vh-73px)]">
          <ScrollArea className="flex flex-shrink-0 border-r w-[200px] h-full">
            <SideBar />
          </ScrollArea>
        </div>

        {children}
      </main>
    </>
  );
};

export default ManagerLayout;
