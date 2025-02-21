"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BlogList from "../components/BlogList";

export default function Home() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState<string | null>(null); // Prevent SSR mismatch

  useEffect(() => {
    // Load saved language preference from localStorage on mount
    const savedLanguage = localStorage.getItem("preferred-language") || "en";
    i18n.changeLanguage(savedLanguage);
    setLocale(savedLanguage); // Set language only after mounting
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLocale(lng);
    localStorage.setItem("preferred-language", lng);
  };

  // Prevent rendering until language is set to avoid SSR mismatch
  if (!locale) return null;

  return (
    <div>
      <header>
        <button
          onClick={() => changeLanguage("en")}
          className={locale === "en" ? "active" : ""}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("fi")}
          className={locale === "fi" ? "active" : ""}
        >
          Suomi
        </button>
      </header>
      <BlogList locale={locale} />
    </div>
  );
}
