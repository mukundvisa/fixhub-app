import React from "react";
import about from "../../../images/about.jpg";
import vision from "../../../images/vision.jpg";
import mission from "../../../images/mission.jpg";
import Image from "next/image";
import Link from "next/link";
import {
  ShareIcon,
  UsersIcon,
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/16/solid";

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
      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-15 py-25">
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
      <section className="bg-black dark:bg-white">
        <div className="container mx-auto px-6 py-25">
          <h2 className="text-4xl font-extrabold text-center mb-15 text-white dark:text-black">
            What Can Do Here
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <ShareIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">
                Share coding fixes & solutions
              </p>
            </div>
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <UsersIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">Browse community knowledge</p>
            </div>
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <ClockIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">Save time debugging</p>
            </div>
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <AcademicCapIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">Learn from real examples</p>
            </div>
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <UserGroupIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">Collaborate with developers</p>
            </div>
            <div className="p-5 text-white dark:text-black flex items-center flex-col gap-6">
              <LightBulbIcon className="w-15 h-15 text-blue-400" />
              <p className="text-center text-lg">
                Improve problem-solving skills
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-300 dark:bg-white/15 py-25">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-15 text-black dark:text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-5 text-center">
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-extrabold">1.</span>
              <h3 className="font-extrabold text-2xl">Explore</h3>
              <p className="text-gray-600 dark:text-gray-200">
                Search for solutions or <br />
                browse topics to find helpful fixes.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-2xl font-extrabold">2.</span>
              <h3 className="font-extrabold text-2xl">Share</h3>
              <p className="text-gray-600 dark:text-gray-200">
                Post your own fixes and <br />
                contribute knowledge to the community.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-2xl font-extrabold">3.</span>
              <h3 className="font-extrabold text-2xl">Grow</h3>
              <p className="text-gray-600 dark:text-gray-200">
                Learn from others and <br />
                improve your development workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-25 text-center">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-black dark:text-white">
          Join the Fix Community
        </h2>
        <p className="text-gray-600 dark:text-gray-200 mb-8 text-xl">
          Start sharing solutions and help others solve problems faster.
        </p>

        <Link
          href="/add-fix"
          target="_blank"
          className="cursor-pointer inline-block px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>
    </>
  );
};

export default page;
