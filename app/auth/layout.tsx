import Header from "@/components/Header";
import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (session && session.user) {
    return redirect("/manager");
  }
  return (
    <div className="h-screen overflow-y-scroll">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
