"use client";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto bg-black dark:bg-white rounded-full shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 text-center flex justify-between items-center">
        <span className="text-sm text-body  font-bold text-white dark:text-black">
          © {currentYear} Akshar FixHub. All Rights Reserved.
        </span>
        <span className="flex gap-5">
          <Link href="https://www.linkedin.com/">
            <FaLinkedin className="fill-white w-5 h-5" />
          </Link>
          <Link href="https://github.com/">
            <FaGithub className="fill-white w-5 h-5" />
          </Link>
          <Link href="https://www.instagram.com/">
            <FaInstagram className="fill-white w-5 h-5" />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
