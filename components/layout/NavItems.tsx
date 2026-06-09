"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavRole = "admin" | "user" | null;

export interface INavLink {
  href: string;
  label: string;
  role: NavRole;
}

export const NAV_LINKS: INavLink[] = [
  { href: "/", label: "Home", role: null },
  { href: "/about", label: "About", role: null },
  { href: "/dashboard", label: "Dashboard", role: "user" },
  { href: "/admin/products", label: "Products", role: "admin" },
  { href: "/admin", label: "Admin", role: "admin" },
];

interface NavItemsProps {
  role: NavRole;
}

const NavItems = ({ role }: NavItemsProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  const visibleLinks = NAV_LINKS.filter((nav) => {
    if (nav.role === null || nav.role === role) {
      return true;
    }

    return false;
  });

  return (
    <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
      {visibleLinks.map((nav, index) => {
        return (
          <Link
            key={nav.href}
            href={nav.href}
            className={`transition hover:text-foreground ${isActive(nav.href) ? "text-foreground" : ""}`}
          >
            {nav.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
