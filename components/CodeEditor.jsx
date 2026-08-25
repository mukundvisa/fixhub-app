"use client";

import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Import Prism language syntax highlighting plugins
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";

export default function CodeEditor({ programmingLanguages, fixSteps }) {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize steps
  const steps = fixSteps && fixSteps.length > 0 ? fixSteps : [{ code: "", explanation: "" }];
  
  // Normalize languages
  const langs = programmingLanguages
    ? programmingLanguages.split(",").map((l) => l.trim()).filter(Boolean)
    : [];

  const getTabName = (index) => {
    if (langs.length > 1 && langs[index]) {
      return langs[index];
    }
    if (langs.length === 1) {
      return `${langs[0]} (Step ${index + 1})`;
    }
    return `Step ${index + 1}`;
  };

  const getLanguageClass = (index) => {
    const langName = (langs.length > 1 ? langs[index] : langs[0]) || "javascript";
    const name = langName.toLowerCase();
    
    if (name === "html" || name === "xml" || name === "svg" || name === "css") return name;
    if (name === "js" || name === "javascript") return "javascript";
    if (name === "ts" || name === "typescript") return "typescript";
    if (name === "py" || name === "python") return "python";
    if (name === "rb" || name === "ruby") return "ruby";
    if (name === "cs" || name === "c#") return "csharp";
    if (name === "cpp" || name === "c++") return "cpp";
    if (name === "react" || name === "jsx" || name === "next.js" || name === "nextjs") return "jsx";
    if (name === "tsx") return "tsx";
    if (name === "sh" || name === "bash" || name === "shell") return "bash";
    if (name === "sql") return "sql";
    if (name === "json") return "json";
    if (name === "java") return "java";
    if (name === "php") return "php";
    
    return "javascript"; // fallback
  };

  // Re-run syntax highlighting whenever active tab changes or when component is mounted
  useEffect(() => {
    if (mounted) {
      Prism.highlightAll();
    }
  }, [activeTab, mounted]);

  if (!mounted) {
    return (
      <div className="w-full mt-6 space-y-6">
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl h-48 animate-pulse flex items-center justify-center">
          <span className="text-xs text-neutral-500 font-mono">Loading code editor...</span>
        </div>
      </div>
    );
  }

  const activeStep = steps[activeTab] || steps[0] || { code: "", explanation: "" };
  const currentLangClass = getLanguageClass(activeTab);

  // Calculate line numbers
  const lines = activeStep.code ? activeStep.code.split("\n") : [""];
  const lineNumbers = lines.map((_, i) => (
    <span key={i} className="block text-neutral-500 text-right pr-4 select-none leading-relaxed">
      {i + 1}
    </span>
  ));

  return (
    <div className="w-full mt-6 space-y-6">
      {/* Editor Container */}
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl transition hover:border-neutral-700">
        
        {/* Editor Titlebar / Header */}
        <div className="bg-[#181818] px-4 flex items-center justify-between border-b border-neutral-800 h-11">
          {/* Mock window control dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          </div>

          {/* Active file/tab label on single step */}
          {steps.length <= 1 && (
            <span className="text-xs text-neutral-400 font-mono font-medium">
              solution.{currentLangClass === "jsx" || currentLangClass === "tsx" ? "jsx" : currentLangClass}
            </span>
          )}

          {/* Empty spacer for alignment */}
          <div className="w-12 sm:block hidden" />
        </div>

        {/* Tab Selection (only show if multiple steps are present) */}
        {steps.length > 1 && (
          <div className="bg-[#141414] flex border-b border-neutral-800 overflow-x-auto scrollbar-none select-none">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-2.5 text-xs font-mono font-medium border-r border-neutral-800 transition flex items-center gap-2 cursor-pointer ${
                  activeTab === index
                    ? "bg-[#1e1e1e] text-white border-t-2 border-t-blue-500 font-semibold"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500/60" />
                {getTabName(index)}
              </button>
            ))}
          </div>
        )}

        {/* Code Content Area */}
        <div className="flex font-mono text-sm leading-relaxed overflow-x-auto relative min-h-[150px]">
          {/* Pinned Line Numbers Column */}
          <div className="select-none text-neutral-600 text-right border-r border-neutral-800 sticky left-0 bg-[#1e1e1e] z-10 pl-4 py-4 min-w-[3rem]">
            {lineNumbers}
          </div>

          {/* Code highlight segment */}
          <pre className="flex-1 p-4 m-0 overflow-visible bg-transparent text-green-400">
            <code className={`language-${currentLangClass}`}>
              {activeStep.code}
            </code>
          </pre>
        </div>
      </div>

      {/* Code Explanation (only shown if the active step has a step-specific explanation) */}
      {activeStep.explanation && (
        <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-mono mb-2 uppercase tracking-wider">
            {steps.length > 1 ? `Step #${activeTab + 1} Explanation` : "Code Explanation"}
          </h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {activeStep.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
