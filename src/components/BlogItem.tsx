// BlogItem.js
"use client";

import Image from "next/image";
import styles from "./Blog.module.css";
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

interface BlogItemProps {
  title: string;
  date: string;
  link: string;
  description: string;
  imageId: string;
}

const truncateHtml = (html: string, maxWords: number) => {
  const words = html.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return html;
};

const BlogItem: React.FC<BlogItemProps> = ({ title, date, description, link, imageId }) => {
  const { t } = useTranslation();
  const BASE_URL = "https://www.varian.com"; // Base URL

  // Check if the link is a relative URL, and if so, prepend the BASE_URL
  const isRelative = !link.startsWith("http");
  const fullLink = isRelative ? `${BASE_URL}${link}` : link;

  const imageUrl = `https://varian.widen.net/content/${imageId}/webp?w=500&h=300&crop=true`;

  // Truncate HTML description
  const truncatedDescription = truncateHtml(description, 40);

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
          <div>{parse(truncatedDescription)}</div>
        </div>
      </a>
      <br />
      <a href={fullLink} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
        {t('Read More')}
      </a>
    </div>
  );
};

export default BlogItem;
