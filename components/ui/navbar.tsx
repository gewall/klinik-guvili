// components/Navbar.js
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type Props = {
  menus: IMenu[];
};

type IMenu = {
  name: string;
  uri: string;
};

const NavLink = ({ name, uri }: IMenu) => {
  const path = usePathname();
  return (
    <Link
      href={uri}
      className={`${
        uri == path ? "text-sky-500" : "text-gray-700"
      } hover:text-sky-500`}
    >
      {name}
    </Link>
  );
};

const Navbar = ({ menus }: Props) => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-lg font-bold text-sky-400">Gewall</div>

        {/* Menu */}
        <div className="hidden md:flex space-x-6">
          {menus.map((item, _) => (
            <Fragment key={_}>
              <NavLink {...item} />
            </Fragment>
          ))}
        </div>

        {/* Dropdown Menu for Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 rounded-md mt-2 p-2 w-full">
            {menus.map((item, _) => (
              <DropdownMenuItem className="w-full" key={_}>
                <NavLink {...item} />
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuItem className="w-full">
              <a
                href="#"
                className="block text-gray-700 hover:text-sky-500 w-full"
              >
                Home
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <a
                href="#"
                className="block text-gray-700 hover:text-sky-500 w-full"
              >
                About
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <a
                href="#"
                className="block text-gray-700 hover:text-sky-500 w-full"
              >
                Services
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <a
                href="#"
                className="block text-gray-700 hover:text-sky-500 w-full"
              >
                Contact
              </a>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
