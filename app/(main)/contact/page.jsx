import React from "react";
import Image from "next/image";
import Link from "next/link";
import contact from "../../../images/contact.jpg";
import { SlEnvolope } from "react-icons/sl";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const page = () => {
  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={contact}
          alt="Add Fix Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 " />

        <div className="relative container mx-auto px-4">
          <nav className="mb-4 text-sm">
            <ol className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900 dark:text-neutral-200">
                Contact
              </li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            Contact
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Reach Out
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            Get in touch with Fix Hub for support, feedback, or collaboration.
            We’re here to help you solve problems faster and improve your
            experience.
          </p>
        </div>
      </section>

      <div className="rounded grid lg:grid-cols-2 items-start gap-16 p-15 mx-auto max-w-7xl max-lg:max-w-2xl bg-black dark:bg-white my-25">
        <div>
          <h2 className="text-3xl font-bold text-white dark:text-black">
            Let's Talk
          </h2>
          <p className="text-[15px] text-white dark:text-black mt-4">
            Get in touch with Fix Hub for support, feedback, or collaboration.
            We’re here to help you solve problems faster and improve your
            experience.
          </p>
          <div className="mt-12">
            <h2 className="text-white dark:text-black text-base font-semibold">
              Email
            </h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <SlEnvolope size={20} className="fill-black" />
                </div>
                <Link
                  href="mailto:info@aksharfixhub.com"
                  className="text-sm ml-4"
                >
                  <small className="block text-white dark:text-black">
                    Mail
                  </small>
                  <spane className="font-semibold text-blue-300 dark:text-blue-600">
                    info@aksharfixhub.com
                  </spane>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-white dark:text-black text-base font-semibold">
              Socials
            </h2>
            <ul className="flex mt-4 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <Link href="https://www.linkedin.com/">
                  <FaLinkedin className="fill-black w-5 h-5" />
                </Link>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <Link href="https://github.com/">
                  <FaGithub className="fill-black w-5 h-5" />
                </Link>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <Link href="https://www.instagram.com/">
                  <FaInstagram className="fill-black w-5 h-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <form className="lg:ml-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 "
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 "
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 "
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4 bg-slate-100 text-slate-900 text-sm pt-3 border border-gray-200 "
          ></textarea>
          <button
            type="button"
            className="text-white bg-blue-600  tracking-wide rounded-md text-sm font-bold px-4 py-3 w-full cursor-pointer  border-0"
          >
            Send message
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
