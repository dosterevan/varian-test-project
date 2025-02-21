"use client";

import { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "./BlogItem";
import styles from "./Blog.module.css"; 
import { useTranslation } from 'react-i18next';

interface BlogListProps {
  locale: string;
}

const BlogList: React.FC<BlogListProps> = ({ locale }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetchBlogs(locale, 3)
      .then(blogs => {
        setBlogs(blogs);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [locale]);

  if (isLoading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  return (
    <div className={styles.blogList}>
      {blogs.length > 0 ? (
        blogs.map((blog: any) => (
          <BlogItem
            key={blog.nid}
            title={blog.title}
            date={blog.date_release}
            link={blog.node_alias}
            description={blog.description}
            imageId={blog.widen_image_id || null}
          />
        ))
      ) : (
        <p>{t('noBlogsFound')}</p>
      )}
    </div>
  );
};

export default BlogList;
