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

export const revalidate = 60;

const getFix = unstable_cache(
  async (id: string) => {
    const [rows]: any = await db.query("SELECT * FROM fixcode WHERE id = ?", [
      id,
    ]);

    return rows[0] || null;
  },
  ["fix-detail"],
);

export default async function CodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const problem = await getFix(id);

  if (!problem) return <div>Not found</div>;

  const generatedTime = new Date().toLocaleString();

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
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/codes">Codes</Link>
              </li>
              <li>/</li>
              <li>{problem.program_title}</li>
            </ol>
          </nav>

          <Link
            href={`/language/${problem.programming_language}`}
            className="inline-block mb-4"
          >
            {problem.programming_language}
          </Link>

          <h1 className="text-4xl font-bold">{problem.program_title}</h1>

          <p>Generated at: {generatedTime}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Fix Code</h2>

        <pre className="bg-neutral-900 text-green-400 rounded-lg p-6 overflow-x-auto">
          {problem.fix_code}
        </pre>
      </div>
    </>
  );
}
