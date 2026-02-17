"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import singleBanner from "../../../../images/codes-banner.jpg";
import Image from "next/image";

export default function LanguagePage() {
  const { lang } = useParams();
  const [problems, setProblems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/get-fix?search=${search}&category=${lang}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data.problems);
        setTotal(data.total);
      });
  }, [search, page]);

  const totalPages = Math.ceil(total / 20);

  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={singleBanner}
          alt="Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />

        <div className="relative container mx-auto px-4">
          <nav className="mb-8 text-sm">
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
                <Link
                  href="/codes"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Language
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900 dark:text-neutral-200">{lang}</li>
            </ol>
          </nav>

          <Link
            href={`/language/${lang}`}
            className="inline-block rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium"
          >
            {lang}
          </Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-15">
        <div className="bg-neutral-900 dark:bg-white p-10 rounded-xl shadow">
          <div className="flex justify-between item-center flex-col md:flex-row gap-5 mb-10">
            {/* Search */}
            <input
              type="text"
              placeholder="Search problems..."
              className="border rounded px-3 py-2 bg-white dark:bg-neutral-900 dark:text-white text-neutral-900 dark:border-neutral-900 w-64"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Table */}
          <div>
            {problems.map((p) => (
              <div
                className="bg-white dark:bg-black rounded shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-center"
                key={p.ID}
              >
                <div className="text-black dark:text-white font-semibold">
                  {p.program_title?.split(" ").slice(0, 6).join(" ")}
                </div>

                <Link
                  href={`/language/${p.programming_language}`}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full justify-self-start sm:justify-self-center"
                >
                  {p.programming_language}
                </Link>

                <Link
                  href={`/codes/${p.ID}`}
                  className="cursor-pointer bg-black dark:bg-white dark:text-black text-white px-4 py-1.5 rounded text-sm justify-self-start sm:justify-self-end font-semibold"
                >
                  View Fix
                </Link>
              </div>
            ))}
            {problems.length === 0 && (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white dark:text-black">
                    No problems found
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Try a different keyword or select another programming
                    language.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center sm:justify-end items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-sm rounded border bg-white dark:bg-black dark:text-white disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page <b>{page}</b> of <b>{totalPages || 1}</b>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm rounded border bg-white dark:bg-black dark:text-white disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
