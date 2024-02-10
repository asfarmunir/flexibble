"use client";
import { NavLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathname = usePathname();
  8;
  return (
    <div className="flex flex-col gap-4 items-start lg:flex-row">
      {NavLinks.map((link) => {
        let isActive = pathname === link.href;
        return (
          <Link
            className={`${
              isActive && "text-primary border-b font-semibold"
            } text-sm`}
            href={link.href}
            key={link.href}
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
