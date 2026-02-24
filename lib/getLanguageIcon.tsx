import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaPhp,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";

import { SiTypescript, SiNextdotjs, SiMongodb } from "react-icons/si";

import React from "react";

export const getLanguageIcon = (language?: string): React.ReactNode => {
  switch (language?.toLowerCase().replace(/[\s.]+/g, "")) {
    case "html":
      return <FaHtml5 className="fill-white dark:fill-black w-8 h-8" />;

    case "css":
      return <FaCss3Alt className="fill-white dark:fill-black w-8 h-8" />;

    case "javascript":
    case "js":
      return <FaJs className="fill-white dark:fill-black w-8 h-8" />;

    case "typescript":
      return <SiTypescript className="fill-white dark:fill-black w-8 h-8" />;

    case "react":
      return <FaReact className="fill-white dark:fill-black w-8 h-8" />;

    case "nextjs":
    case "next":
      return <SiNextdotjs className="fill-white dark:fill-black w-8 h-8" />;

    case "node":
    case "nodejs":
      return <FaNodeJs className="fill-white dark:fill-black w-8 h-8" />;

    case "python":
      return <FaPython className="fill-white dark:fill-black w-8 h-8" />;

    case "java":
      return <FaJava className="fill-white dark:fill-black w-8 h-8" />;

    case "php":
      return <FaPhp className="fill-white dark:fill-black w-8 h-8" />;

    case "git":
      return <FaGitAlt className="fill-white dark:fill-black w-8 h-8" />;

    case "mongodb":
      return <SiMongodb className="fill-white dark:fill-black w-8 h-8" />;

    case "sql":
    case "database":
      return <FaDatabase className="fill-white dark:fill-black w-8 h-8" />;

    default:
      return <FaDatabase className="fill-white dark:fill-black w-8 h-8" />;
  }
};
