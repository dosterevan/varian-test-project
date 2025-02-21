"use client";

import Image from "next/image";
import styles from "./Blog.module.css";
import parse from "html-react-parser";
// import { useTranslation } from "react-i18next";

// Utility function to strip HTML tags
const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

interface BlogItemProps {
  title: string;
  date: string;
  link: string;
  description: string;
  imageId: string;
}

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};


const BlogItem: React.FC<BlogItemProps> = ({
  title,
  date,
  description,
  link,
  imageId,
}) => {
  // const { t } = useTranslation();
  const BASE_URL = "https://www.varian.com"; // Base URL

  // Check if the link is a relative URL, and if so, prepend the BASE_URL
  const isRelative = !link.startsWith("http");
  const fullLink = isRelative ? `${BASE_URL}${link}` : link;

  const imageUrl = `https://varian.widen.net/content/${imageId}/webp?w=500&h=300&crop=true`;

  // Truncate HTML description
  const plainDescription = truncateText(stripHtmlTags(description), 60);

  return (
    <div className={styles.blogItem}>
      <a href={fullLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image src={imageUrl} alt={title} width={500} height={300} />
        </div>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.date}>{date}</p>
          {/* Render truncated HTML content */}
          <div>{parse(plainDescription)}</div>
          <p className={styles.readMore}>Read More</p>
        </div>
      </a>
    </div>
  );
};

export default BlogItem;
