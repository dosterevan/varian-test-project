"use client";

import { useState } from "react";
import BlogList from "../components/BlogList";

export default function Home() {
  const [locale, setLocale] = useState("en");

  return (
    <div>
      <header>
        <button onClick={() => setLocale("en")}>English</button>
        <button onClick={() => setLocale("fi")}>Suomi</button>
      </header>
      {/* Pass the locale prop to BlogList */}
      <BlogList locale={locale} />
      
    </div>
  );
}
