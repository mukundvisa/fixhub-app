"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("/api/user-id")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.id))
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    fetch("/api/get-link")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    setIsDark(isDarkNow);
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/login");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-black shadow-md backdrop-blur my-0 py-5"
            : "bg-transparent my-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            Akshar
            <span className="ml-1 text-blue-600 dark:text-blue-400">
              FixHub
            </span>
          </Link>

          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Bars3Icon className="w-7 h-7" />
          </button>

          <ul className="hidden md:flex items-center gap-3 bg-black dark:bg-white px-5 py-2 rounded-full shadow">
            {menu &&
              menu.map((item, index) => {
                if (item.children) {
                  if (!isLoggedIn) return null;

                  return (
                    <li key={index} className="relative group">
                      <button className="cursor-pointer px-3 font-medium text-neutral-400 hover:text-white dark:hover:text-black">
                        <div className="flex items-center gap-2">
                          {item.name}{" "}
                          <ChevronDownIcon className="w-4.5 h-4.5" />
                        </div>
                      </button>

                      <ul className="absolute left-0 top-full hidden group-hover:block bg-black dark:bg-white py-1.5 w-25 text-center rounded-b-lg">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.path}
                              className="block px-4 py-2 text-sm text-neutral-400 hover:text-white dark:hover:text-black"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

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

            <button
              onClick={toggleTheme}
              className="cursor-pointer border border-neutral-400 dark:border-neutral-500 hover:border-white dark:hover:border-black rounded-full p-2 transition"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 fill-neutral-500 stroke-neutral-500 hover:fill-black hover:stroke-black" />
              ) : (
                <MoonIcon className="w-5 h-5 fill-neutral-400 hover:fill-white" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="bg-white dark:bg-black cursor-pointer border border-neutral-400 dark:border-neutral-500 hover:border-white dark:hover:border-black rounded-full p-2 transition"
            >
              {isLoggedIn ? (
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              ) : (
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
              )}
            </button>
          </ul>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 w-72 h-full bg-black dark:bg-white p-5">
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)}>
                <XMarkIcon className="w-6 h-6 stroke-white dark:stroke-black" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {menu.map((item, index) => {
                if (item.children) {
                  return (
                    <div key={index}>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="pb-3 flex justify-between w-full font-medium text-white dark:text-black border-b border-gray-200 dark:border-white/20"
                      >
                        {item.name}
                        <span className="cursor-pointer">
                          {openDropdown === index ? (
                            <MinusIcon className="w-6 h-6 stroke-white dark:stroke-black" />
                          ) : (
                            <PlusIcon className="w-6 h-6 stroke-white dark:stroke-black" />
                          )}
                        </span>
                      </button>

                      {openDropdown === index && (
                        <div className="mt-4 flex flex-col gap-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.path}
                              onClick={() => setMenuOpen(false)}
                              className="pl-6 pb-3 text-neutral-300 dark:text-neutral-700 border-b border-gray-200 dark:border-white/20 last:border-b-0"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="pb-3 font-medium text-white dark:text-black border-b border-gray-200 dark:border-white/20 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="flex justify-between items-center">
                <span className="text-white dark:text-black">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="border border-neutral-400 dark:border-neutral-500 hover:border-white dark:hover:border-black rounded-full p-2 transition"
                >
                  {isDark ? (
                    <SunIcon className="w-4 h-4 fill-neutral-500 stroke-neutral-500 hover:fill-black hover:stroke-black" />
                  ) : (
                    <MoonIcon className="w-4 h-4 fill-neutral-400 hover:fill-white" />
                  )}
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="cursor-pointer border border-red-500 text-red-500 rounded-md py-2"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
