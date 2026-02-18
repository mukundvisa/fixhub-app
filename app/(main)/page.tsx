import Link from "next/link";
import Image from "next/image";
import codeBanner from "../../images/codes-banner.jpg";
import db from "@/lib/db";

export async function getProblems() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM fixcode ORDER BY ID DESC",
    );
    return rows;
  } catch (error) {
    console.error("DB error:", error);
    return [];
  }
}

export default async function Home() {
  const problems = await getProblems();

  return (
    <>
      <section className="relative w-full py-85">
        <Image
          src={codeBanner}
          alt="Add Fix Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />

        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            Home
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white text-center mb-10">
            Fix Bugs. Share Solutions. Help Developers.
          </h1>

          <p className="my-10 text-neutral-700 dark:text-neutral-300 text-base md:text-lg text-2xl font-medium text-center">
            Share real-world coding problems & their solutions step by step.
            Learn faster, solve smarter, and help others by
            <br />
            publishing fixes in one place.
          </p>

          <div className="text-center">
            <Link
              href="/add-fix"
              className="bg-blue-600 px-4 py-4 font-bold text-1xl rounded-md mt-5 text-white "
            >
              Add Your Fix
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-15">
        <div className="bg-neutral-900 dark:bg-white p-10 rounded-xl shadow">
          <div>
            <h1 className="text-center text-white dark:text-neutral-900 text-3xl font-bold mb-5">
              All Coding Problems in One Place
            </h1>

            <p className="text-center text-white dark:text-neutral-900 text-lg font-medium mb-15">
              This platform provides a wide range of programming problems in
              JavaScript, React, Python, PHP, and many other technologies, along
              with well-structured and reliable solutions.
              <br />
              If a specific problem is not currently available, users can
              resolve the issue independently and submit their solution through
              the{" "}
              <Link className="text-blue-400 font-bold" href="/add-fix">
                Add Your Fix
              </Link>{" "}
              for future reference.
            </p>
          </div>

          <div>
            {problems.map((p: any) => (
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

            {problems.length > 0 && (
              <div className="flex justify-center mt-8">
                <Link
                  href="/codes"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition"
                >
                  View All Codes
                </Link>
              </div>
            )}

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
        </div>
      </div>
    </>
  );
}
