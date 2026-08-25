"use client";

import { useState, useEffect } from "react";
import addFixBanner from "../../../../images/add-fix-banner.jpg";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function EditFix() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userId, setUserId] = useState(null);

  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [explanations, setExplanations] = useState([""]);
  const [fixSteps, setFixSteps] = useState([{ code: "", explanation: "" }]);

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
        const rawFixCode = data.problem?.fix_code || "";
        let parsed = { explanations: [], fix_steps: [] };
        
        try {
          if (rawFixCode.trim().startsWith("{")) {
            parsed = JSON.parse(rawFixCode);
          } else {
            throw new Error("Legacy text");
          }
        } catch (e) {
          // Legacy format fallback
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

        setProgrammingLanguage(data.problem?.programming_language || "");
        setProblemTitle(data.problem?.program_title || "");
        setExplanations(parsed.explanations && parsed.explanations.length > 0 ? parsed.explanations : [""]);
        setFixSteps(parsed.fix_steps && parsed.fix_steps.length > 0 ? parsed.fix_steps : [{ code: "", explanation: "" }]);
      });
  }, [id]);

  const handleAddExplanation = () => {
    setExplanations([...explanations, ""]);
  };

  const handleRemoveExplanation = (index) => {
    setExplanations(explanations.filter((_, i) => i !== index));
  };

  const handleExplanationChange = (index, value) => {
    const updated = [...explanations];
    updated[index] = value;
    setExplanations(updated);
  };

  const handleAddFixStep = () => {
    setFixSteps([...fixSteps, { code: "", explanation: "" }]);
  };

  const handleRemoveFixStep = (index) => {
    setFixSteps(fixSteps.filter((_, i) => i !== index));
  };

  const handleFixStepChange = (index, field, value) => {
    const updated = [...fixSteps];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setFixSteps(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!programmingLanguage.trim() || !problemTitle.trim()) {
      setMessage("Programming Language and Problem Title are required.");
      setMessageType("error");
      return;
    }

    const filteredExplanations = explanations.filter(exp => exp.trim() !== "");
    const filteredFixSteps = fixSteps.filter(step => step.code.trim() !== "" || step.explanation.trim() !== "");

    if (filteredExplanations.length === 0 && filteredFixSteps.length === 0) {
      setMessage("Please add at least one explanation or fix step.");
      setMessageType("error");
      return;
    }

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
          programmingLanguage,
          problemTitle,
          fixCode: JSON.stringify({
            explanations: filteredExplanations,
            fix_steps: filteredFixSteps
          }),
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
                value={programmingLanguage}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                className="mt-2 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white dark:text-black">
                Problem Title
              </label>
              <input
                type="text"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* HOW DID YOU FIX THIS? Section */}
            <div className="border-t border-neutral-800 dark:border-neutral-200 pt-6 space-y-6">
              <h3 className="text-lg font-medium text-white dark:text-black">
                How Did You Fix This?
              </h3>

              {/* Explanations Repeater */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-neutral-300 dark:text-neutral-700">
                  Explanation (General Steps)
                </label>
                {explanations.map((exp, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <textarea
                      value={exp}
                      onChange={(e) => handleExplanationChange(index, e.target.value)}
                      placeholder="Explain the problem or general step..."
                      rows={2}
                      className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    />
                    {explanations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExplanation(index)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition cursor-pointer self-center"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddExplanation}
                  className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 transition font-medium cursor-pointer"
                >
                  <PlusIcon className="w-4 h-4" /> Add Explanation Entry
                </button>
              </div>

              {/* Fix Steps Repeater (Code and Explanation) */}
              <div className="space-y-6 pt-2">
                <label className="block text-sm font-medium text-neutral-300 dark:text-neutral-700">
                  Fix Steps (Code & Code Explanation)
                </label>
                {fixSteps.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-neutral-800 dark:border-neutral-200 bg-neutral-950/40 dark:bg-neutral-50/40 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-blue-500 dark:text-blue-600">
                        Step #{index + 1}
                      </span>
                      {fixSteps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFixStep(index)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer"
                        >
                          <TrashIcon className="w-4 h-4" /> Remove Step
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 dark:text-neutral-600 mb-1">
                        Code
                      </label>
                      <textarea
                        value={step.code}
                        onChange={(e) => handleFixStepChange(index, "code", e.target.value)}
                        placeholder="Paste your code snippet here..."
                        rows={4}
                        className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black font-mono text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 dark:text-neutral-600 mb-1">
                        Explanation
                      </label>
                      <textarea
                        value={step.explanation}
                        onChange={(e) => handleFixStepChange(index, "explanation", e.target.value)}
                        placeholder="Explain this specific code block..."
                        rows={2}
                        className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-white dark:text-black text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddFixStep}
                  className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 transition font-medium cursor-pointer"
                >
                  <PlusIcon className="w-4 h-4" /> Add Code & Explanation Entry
                </button>
              </div>
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
