"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import myfix from "../../../images/myfix.jpg";
import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const page = () => {
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  const totalPages = Math.ceil(total / 20);

  // Get User ID
  useEffect(() => {
    fetch("/api/user-id")
      .then((res) => res.json())
      .then((data) => setUserId(data.id));
  }, []);

  // Get Problem Data
  useEffect(() => {
    if (!userId) return;
    fetch(
      `/api/get-fix?search=${search}&category=${category}&page=${page}&userId=${userId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProblems(data.problems);
        setCategories(data.categories);
        setTotal(data.total);
      });
  }, [search, category, page, userId]);

  // Delete Problem In Database
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/delete-fix", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setProblems((prev) => prev.filter((p) => p.ID !== id));
        alert("Problem deleted successfully");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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
      <div className="container mx-auto px-4 py-15">
        <div className="bg-neutral-900 dark:bg-white p-10 rounded-xl shadow">
          <div className="flex justify-between item-center flex-col md:flex-row gap-5 mb-10">
            {/* Filter */}
            <select
              className="border rounded px-3 py-2 bg-white dark:bg-neutral-900 dark:text-white text-neutral-900 dark:border-neutral-900 w-64"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

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
                className="bg-white dark:bg-black rounded-xl shadow-md hover:shadow-lg transition p-4 mb-4 
             grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-center"
                key={p.ID}
              >
                <div className="text-black dark:text-white font-semibold text-sm sm:text-base">
                  {p.program_title?.split(" ").slice(0, 6).join(" ")}
                </div>

                <Link
                  href={`/language/${p.programming_language}`}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white text-xs px-3 py-1 rounded-full text-center"
                >
                  {p.programming_language}
                </Link>

                <Link
                  href={`/codes/${p.ID}`}
                  className="bg-black dark:bg-white dark:text-black text-white 
               hover:opacity-80 transition px-4 py-1.5 rounded-lg text-sm font-semibold text-center"
                >
                  View Fix
                </Link>

                <div className="flex items-center gap-2 justify-start sm:justify-end">
                  {/* Edit Button */}
                  <Link
                    href={`/my-fixes/${p.ID}`}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 
                 dark:bg-green-900 dark:hover:bg-green-800 
                 transition"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(p.ID)}
                    className="p-2 cursor-pointer rounded-lg bg-red-100 hover:bg-red-200 
                 dark:bg-red-900 dark:hover:bg-red-800 
                 transition"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-300" />
                  </button>
                </div>
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
};

export default page;
