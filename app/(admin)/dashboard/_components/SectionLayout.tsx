"use client";

import React, { Fragment, ReactNode } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Typograph from "@/components/ui/typograph";

type Props = {
  children: ReactNode;
  title: string;
};

// type iBreadcrumb = {
//   urls: IBreadcrumbType[];
// };

// type IBreadcrumbType = {
//   url: string;
//   name: string;
// };

const CustomBreadcrumb = () => {
  const path = usePathname();
  const _path = path.split("/");
  console.log(_path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {_path.slice(1, _path.length).map((_, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${_path.slice(1, i + 2).join("/")}`}>
                  {_.slice(0, 1).toUpperCase() + _.slice(1, _.length)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== _path.length - 2 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
        {/* <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
const SectionLayout = (props: Props) => {
  return (
    <Fragment>
      <div className=" border-slate-100 border-2 rounded-md w-full p-4">
        <CustomBreadcrumb />
        <div className="my-4">
          <Typograph variant="Sub-Header">{props.title}</Typograph>
        </div>
        {props.children}
      </div>
      <div className="bg-slate-100   mt-4 bottom-0  p-4">
        <center>
          <Typograph variant="Text" className="text-slate-300">
            Amel 2024
          </Typograph>
        </center>
      </div>
    </Fragment>
  );
};

export default SectionLayout;
