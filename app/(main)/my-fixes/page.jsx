"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import myfix from "../../../images/myfix.jpg";

const page = () => {
  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={myfix}
          alt="Add Fix Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />

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
              <li className="text-neutral-900 dark:text-neutral-200">My Fix</li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            MY FIX
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            My Problems & Fixes
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            All the problems you’ve submitted are listed here along with their
            solutions.
          </p>
        </div>
      </section>
    </>
  );
};

export default page;
