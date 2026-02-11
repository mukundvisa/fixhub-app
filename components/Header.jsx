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
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Codes", path: "/codes" },
  { name: "Add Fix", path: "/add-fix" },
  { name: "My Fixes", path: "/my-fixes" },
  { name: "Profile", path: "/profile" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");

    router.refresh();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 my-5">
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
            {navLinks.map((item) => {
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
                <SunIcon className="w-4 h-4 fill-neutral-500 stroke-neutral-500 hover:fill-black hover:stroke-black" />
              ) : (
                <MoonIcon className="w-4 h-4 fill-neutral-400 hover:fill-white" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="cursor-pointer border border-neutral-400 dark:border-neutral-500 hover:border-white dark:hover:border-black rounded-full p-2 transition"
            >
              <ArrowRightStartOnRectangleIcon className="w-4 h-4 fill-neutral-400 dark:fill-neutral-500 hover:fill-white dark:hover:fill-black" />
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

            <div className="flex flex-col gap-4 mt-6">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-white dark:text-black"
                >
                  {item.name}
                </Link>
              ))}

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
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
