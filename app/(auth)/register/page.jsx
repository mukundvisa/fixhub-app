"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="text-3xl font-semibold mb-5">
          Akshar
          <span className="ml-1 text-blue-600 dark:text-blue-400">FixHub</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register Your Account
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="cursor-pointer bg-blue-400 text-white w-full py-2 rounded">
            Register
          </button>
          <p className="mt-4 text-center text-sm/6 text-gray-400">
            Have account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </form>
        {message && (
          <div
            className="py-2 px-28 mt-4 text-sm text-green-100 rounded-lg bg-green-700"
            role="alert"
          >
            <span className="font-bold">{message}</span>
          </div>
        )}
      </div>
    </>
  );
}
