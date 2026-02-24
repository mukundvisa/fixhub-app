"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import programmingLanguage from "../../../images/programming-language.jpg";
import { getLanguageIcon } from "@/lib/getLanguageIcon";

type Language = string;

const page = () => {
  const [language, setLanguage] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/get-fix")
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data.categories || []);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={programmingLanguage}
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
                Language
              </li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            Language
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            All Programming Languages - Problems & Fixes
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            Find coding issues, troubleshooting guides, and solutions for
            various programming languages in one place.
          </p>
        </div>
      </section>
      <section className="py-20 container mx-auto">
        <div className="grid md:grid-cols-6 gap-4 px-10">
          {language.map((lang, index) => (
            <Link
              key={index}
              href={`/language/${lang}`}
              className="flex items-center gap-3 bg-black dark:bg-white p-3 rounded"
            >
              <div className="text-white dark:text-black">
                {getLanguageIcon(lang)}
              </div>

              <span className="text-white dark:text-black font-semibold">
                {lang}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
