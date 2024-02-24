"use client";
import { NavLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = ({ loggedUserId }: { loggedUserId: string }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 items-start lg:flex-row">
      {NavLinks.map((link) => {
        let isActive = pathname === link.href;
        if (
          !loggedUserId &&
          link.text !== "Your Profile" &&
          link.text !== "Add Projects"
        ) {
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
        } else if (loggedUserId) {
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
        }
      })}
    </div>
  );
};

export default Navlinks;
