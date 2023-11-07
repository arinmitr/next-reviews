"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
}
const NavLink = ({ children, href, prefetch = true }: NavLinkProps) => {
  const pathname = usePathname();
  if (pathname === href) {
    return <span className="text-orange-800">{children}</span>;
  }
  return (
    <Link
      href={href}
      className="text-orange-800 hover:underline"
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

export default NavLink;
