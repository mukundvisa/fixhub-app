"use client";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto bg-black dark:bg-white rounded-full shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center font-bold text-white dark:text-black">
          © {currentYear} Akshar FixHub. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          <li>
            <Link
              href="#"
              className="me-4 md:me-6 font-bold text-white dark:text-black"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="me-4 md:me-6 font-bold text-white dark:text-black"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="font-bold text-white dark:text-black">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
