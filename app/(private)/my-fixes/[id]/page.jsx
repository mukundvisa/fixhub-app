"use client";

import { useState, useEffect } from "react";
import addFixBanner from "../../../../images/add-fix-banner.jpg";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function AddFix() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    programmingLanguage: "",
    problemTitle: "",
    fixCode: "",
  });

  // Get User ID
  useEffect(() => {
    fetch("/api/user-id")
      .then((res) => res.json())
      .then((data) => setUserId(data.id));
  }, []);

  // fetch existing fix
  useEffect(() => {
    if (!id) return;

    fetch(`/api/get-fix?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          programmingLanguage: data.problem?.programming_language || "",
          problemTitle: data.problem?.program_title || "",
          fixCode: data.problem?.fix_code || "",
        });
      });
  }, [id]);

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
      if (!userId) return;
      const response = await fetch("/api/add-fix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...formData,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage("Fix updated successfully!");
      setMessageType("success");
      router.push("/my-fixes");
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
                <Link
                  href="/my-fixes"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  My Fixes
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900 dark:text-neutral-200">{id}</li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            UPDATE FIX
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            Update Your Fix
          </h1>
        </div>
      </section>

      <div className="px-3 py-5 container mx-auto">
        <div className="max-w-3xl mx-auto mt-10 bg-neutral-900 dark:bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-semibold text-white dark:text-black">
            Edit Fix
          </h1>

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
                className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition cursor-pointer"
            >
              {loading ? "Updating..." : "Update Fix"}
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
