"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [menu, setMenu] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/get-link")
      .then((res) => res.json())
      .then((data) => setMenu(data[1]));
  }, []);

  return (
    <footer className="container mx-auto bg-black dark:bg-white rounded-full shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center font-bold text-white dark:text-black">
          © {currentYear} Akshar FixHub. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`px-3 py-1 font-medium rounded-full ${
                    isActive
                      ? "text-white dark:text-black"
                      : "text-neutral-400 hover:text-white dark:text-neutral-500 dark:hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
