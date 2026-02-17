"use client";

import { useState } from "react";
import addFixBanner from "../../../images/add-fix-banner.jpg";
import Image from "next/image";
import Link from "next/link";

export default function AddFix() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    programmingLanguage: "",
    problemTitle: "",
    fixCode: "",
    userId: userId,
  });
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setMessage("");

    try {
      const response = await fetch("/api/add-fix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setMessage("Fix Save successfully!");
      setMessageType("success");

      setFormData({
        programmingLanguage: "",
        problemTitle: "",
        fixCode: "",
        userId: userId,
      });
    } catch (error) {
      setMessage("" + error.message);
      setMessageType("error");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={addFixBanner}
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
              <li className="text-neutral-900 dark:text-neutral-200">
                Add Fix
              </li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            ADD FIX
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Share Your Fix
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            Help others by sharing how you solved a problem. Add the programming
            language, problem title, & clear step-by-step explanation so anyone
            can understand and apply your fix.
          </p>
        </div>
      </section>

      <div className="px-3 py-5 container mx-auto">
        <div className="max-w-3xl mx-auto mt-10 bg-neutral-900 dark:bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-semibold text-white dark:text-black">
            Add a New Fix
          </h1>
          <p className="text-sm text-neutral-400 dark:text-neutral-600 mt-1">
            Share how you solved a problem so others can learn from it.
          </p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white dark:text-black">
                Programming Language
              </label>
              <input
                type="text"
                name="programmingLanguage"
                value={formData.programmingLanguage}
                onChange={handleChange}
                placeholder="e.g. Css, React, Html"
                className="mt-2 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white dark:text-black">
                Problem Title
              </label>
              <input
                type="text"
                name="problemTitle"
                value={formData.problemTitle}
                onChange={handleChange}
                placeholder="e.g. Equal Height Box"
                className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white dark:text-black">
                How Did You Fix This?
              </label>
              <textarea
                name="fixCode"
                value={formData.fixCode}
                onChange={handleChange}
                rows={6}
                placeholder="Explain the problem and solution step by step..."
                className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition cursor-pointer"
            >
              {loading ? "Publishing..." : "Publish Fix"}
            </button>
            {message && (
              <p
                className={`text-center mt-2 font-medium ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
