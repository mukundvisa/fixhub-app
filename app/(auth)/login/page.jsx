"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("data", data);

    if (data.success) {
      router.push("/");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-3xl font-semibold mb-5">
        Akshar
        <span className="ml-1 text-blue-600 dark:text-blue-400">FixHub</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to your account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 "
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="relative w-full mb-4">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full pr-10"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {isVisible ? (
            <EyeIcon
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={toggleVisibility}
            />
          ) : (
            <EyeSlashIcon
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={toggleVisibility}
            />
          )}
        </div>

        <button className="cursor-pointer bg-blue-400 text-white w-full py-2 font-bold rounded">
          Login
        </button>

        <p className="mt-4 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register Now
          </Link>
        </p>
      </form>
      {message && (
        <div
          className="py-2 px-28 mt-4 text-sm text-red-100 rounded-lg bg-red-700"
          role="alert"
        >
          <span className="font-bold">{message}</span>
        </div>
      )}
    </div>
  );
}
