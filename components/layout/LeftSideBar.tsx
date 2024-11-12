"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks, navLinksEmp } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.publicMetadata.role;

  const links = role === "employee" ? navLinksEmp : navLinks;
  const defaultPath = role === "employee" ? "/collections" : "/";

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-[#1F2937] shadow-xl text-gray-300 max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex items-center gap-4 p-3 rounded-md transition-colors text-body-medium ${
              pathname === link.url || (pathname === "/" && link.url === defaultPath)
                ? "bg-[#FDAB04] text-gray-900"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center text-body-medium text-gray-300 hover:text-white">
        <UserButton />
        <p className="cursor-pointer">Tài khoản</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
