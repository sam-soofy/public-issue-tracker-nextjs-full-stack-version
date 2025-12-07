"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineTrackChanges } from "react-icons/md";
import classNames from "classnames";

const NavigationBar = () => {
  const currPath = usePathname();
  console.log(currPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const linksClassNames = (isActive: boolean) => {
    return classNames({
      "text-zinc-900": isActive,
      "text-zinc-500 hover:text-zinc-800 transition-colors": !isActive,
    });
  };

  return (
    <div>
      <nav className="flex space-x-6 items-center h-16 mb-8 md:ps-[10%] border-b border-gray-500">
        <Link className="pe-4" href="/">
          <MdOutlineTrackChanges fontSize="2rem" />
        </Link>
        <ul className="flex space-x-6 items-center">
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link
                  key={link.href}
                  href={link.href}
                  className={linksClassNames(link.href === currPath)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
