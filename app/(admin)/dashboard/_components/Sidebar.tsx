import React from "react";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  BookDown,
  BookUp,
  Calendar,
  Home,
  Inbox,
  LogOut,
  Pill,
  Search,
  Settings,
  Tablet,
  User2,
} from "lucide-react";
import Link from "next/link";
import Typograph from "@/components/ui/typograph";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import { signOut } from "@/auth";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <ShadSidebar variant="floating">
      <SidebarHeader>
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="icon" width={50} height={50} />
          <Typograph variant="Sub-Header">Klinik Guvili</Typograph>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard"}>
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/obat"}>
                    <Pill />
                    <span>Obat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/pasien"}>
                    <User2 />
                    <span>Pasien</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/users"}>
                    <User2 />
                    <span>Pengguna</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Transaksi</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href={"/dashboard/transaksi/masuk"}>
                        <BookDown size={12} />
                        <span>Masuk</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href={"/dashboard/transaksi/keluar"}>
                        <BookUp size={12} />
                        <span>Keluar</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <LogOut />
                  <span className="text-red-400">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </ShadSidebar>
  );
};

export default Sidebar;