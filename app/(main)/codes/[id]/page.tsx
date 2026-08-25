// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import singleBanner from "../../../../images/codes-banner.jpg";

// export default function CodeDetailPage() {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     fetch(`/api/get-fix?id=${id}`)
//       .then((res) => res.json())
//       .then((res) => setData(res));
//   }, [id]);

//   if (!data) return null;

//   return (
//     <>
//       <section className="relative w-full pt-32 pb-20">
//         <Image
//           src={singleBanner}
//           alt="Banner"
//           fill
//           priority
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />

//         <div className="relative container mx-auto px-4">
//           <nav className="mb-8 text-sm">
//             <ol className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
//               <li>
//                 <Link
//                   href="/"
//                   className="hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>/</li>
//               <li className="text-neutral-900 dark:text-neutral-200">
//                 <Link
//                   href="/codes"
//                   className="hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   Codes
//                 </Link>
//               </li>
//               <li>/</li>
//               <li className="text-neutral-900 dark:text-neutral-200">
//                 {data.problem.program_title}
//               </li>
//             </ol>
//           </nav>

//           <Link
//             href={`/language/${data.problem.programming_language}`}
//             className="inline-block mb-8 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium"
//           >
//             {data.problem.programming_language}
//           </Link>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
//             {data.problem.program_title}
//           </h1>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-2xl font-bold mb-4">Fix Code</h2>

//         <div className="bg-neutral-900 text-green-400 rounded-lg p-6 overflow-x-auto text-sm font-mono">
//           <pre>
//             <code>{data.problem.fix_code}</code>
//           </pre>
//         </div>
//       </div>
//     </>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import singleBanner from "../../../../images/codes-banner.jpg";
import db from "@/lib/db";
import { unstable_cache } from "next/cache";
import CodeEditor from "@/components/CodeEditor";

export const revalidate = 60;

const getFix = unstable_cache(
  async (id: string) => {
    const [rows]: any = await db.query(
      "SELECT f.*, u.name AS user_name FROM fixcode f LEFT JOIN users u ON f.user_id = u.id WHERE f.id = ?",
      [id]
    );

    return rows[0] || null;
  },
  ["getfix"],
  {
    tags: ["fix"],
  },
);

export default async function CodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getFix(id);

  if (!data) return <div>Not found</div>;

  const rawFixCode = data.fix_code || "";
  let parsed: {
    explanations: string[];
    fix_steps: { code: string; explanation: string }[];
  } = { explanations: [], fix_steps: [] };

  try {
    if (rawFixCode.trim().startsWith("{")) {
      parsed = JSON.parse(rawFixCode);
    } else {
      throw new Error("Legacy text");
    }
  } catch (e) {
    // Fallback format for legacy records
    parsed = {
      explanations: [],
      fix_steps: [
        {
          code: rawFixCode,
          explanation: ""
        }
      ]
    };
  }

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
                  Codes
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900 dark:text-neutral-200">
                {data.program_title}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              href={`/language/${data.programming_language}`}
              className="inline-block rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium"
            >
              {data.programming_language}
            </Link>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Added by <strong className="text-neutral-800 dark:text-neutral-200 font-semibold">{data.user_name || "Unknown"}</strong>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            {data.program_title}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* General Explanations List */}
        {parsed.explanations && parsed.explanations.length > 0 && (
          <div className="mb-8 space-y-4 bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Explanation & Context
            </h3>
            <div className="space-y-4">
              {parsed.explanations.map((exp: string, index: number) => (
                <p key={index} className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
                  {exp}
                </p>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          Fix Code
        </h3>
        
        <CodeEditor
          programmingLanguages={data.programming_language}
          fixSteps={parsed.fix_steps}
        />
      </div>
    </>
  );
}
