import React from "react";
import about from "../../../images/about.jpg";
import vision from "../../../images/vision.jpg";
import mission from "../../../images/mission.jpg";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={about}
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
              <li className="text-neutral-900 dark:text-neutral-200">About</li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            About
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            About Fix Hub
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            Fix Hub is a platform built to help developers share solutions,
            discover fixes faster, and collaborate with the community to solve
            real coding problems efficiently.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-15 py-12">
        <div className="p-6 rounded-2xl bg-black dark:bg-white">
          <Image
            src={mission}
            alt="our mission image"
            className="object-contain w-full rounded-3xl "
          />
          <h2 className="text-2xl font-semibold my-3 text-white dark:text-black">
            Our Mission
          </h2>
          <p className="text-gray-300 dark:text-gray-600">
            To create a reliable knowledge hub where developers can quickly find
            solutions, share fixes, and reduce time spent debugging.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-black dark:bg-white">
          <Image
            src={vision}
            alt="our vision image"
            className=" object-contain w-full rounded-3xl "
          />
          <h2 className="text-2xl font-semibold my-3 text-white dark:text-black">
            Our Vision
          </h2>
          <p className="text-gray-300 dark:text-gray-600">
            To become a go-to resource for developers worldwide seeking
            practical solutions and collaborative learning.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 ">
        <h2 className="text-3xl font-bold text-center mb-10">
          What You Can Do Here
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Share coding fixes and solutions",
            "Browse community knowledge",
            "Save time debugging",
            "Learn from real examples",
            "Collaborate with developers",
            "Improve problem-solving skills",
          ].map((feature, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 dark:bg-white/5 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Explore</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search for solutions or browse topics to find helpful fixes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">2. Share</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Post your own fixes and contribute knowledge to the community.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">3. Grow</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from others and improve your development workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Fix Community</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start sharing solutions and help others solve problems faster.
        </p>

        <button className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
          Get Started
        </button>
      </section>
    </>
  );
};

export default page;
