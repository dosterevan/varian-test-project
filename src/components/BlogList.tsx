import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/api";
import BlogItem from "./BlogItem";
import styles from "./Blog.module.css"; // Import CSS for BlogList

// Define the expected prop types for BlogList
interface BlogListProps {
  locale: string;
}

const BlogList: React.FC<BlogListProps> = ({ locale }) => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs(locale, 3).then(setBlogs); // Fetch blogs based on current locale
  }, [locale]);

  return (
    <div className={styles.BlogList}>
      {blogs.length > 0 ? (
        blogs.map((blog: any, index) => (
          <React.Fragment key={blog.nid}>
            <BlogItem
              title={blog.title}
              date={blog.date_release} // Pass the date prop
              description={blog.description}
              link={blog.node_alias}
              imageId={blog.widen_image_id || null} // Check if imageId exists
            />
            {index !== blogs.length - 1 && <hr className={styles.divider} />}
          </React.Fragment>
        ))
      ) : (
        <p>Loading blogs...</p>
      )}
    </div>
  );
};

export default BlogList;
