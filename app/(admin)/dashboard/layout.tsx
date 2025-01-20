import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Sidebar />
        {/* <SidebarTrigger /> */}
        <div className="flex flex-col w-full mx-4 relative">
          <Navbar />
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default Layout;
