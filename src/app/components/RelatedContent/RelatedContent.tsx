import Link from "next/link";
import styles from "./RelatedContent.module.scss";
import { truncateDesc } from "../../../lib/utils";
interface Article {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    authors: string[];
    category: string[];
    tags: string[];
    slug: string;
  };
  createdAt: string;
}

interface RelatedContentProps {
  currentPost: Article;
  allPosts: Article[];
}

export default function RelatedContent({
  currentPost,
  allPosts,
}: RelatedContentProps) {
  const getRelatedPosts = () => {
    const currentCategories = currentPost.attributes.category;
    const currentTags = currentPost.attributes.tags;

    return allPosts
      .filter((post) => post._id !== currentPost._id)
      .filter((post) => {
        const hasCommonCategory = post.attributes.category.some((cat) =>
          currentCategories.includes(cat)
        );
        const hasCommonTag = post.attributes.tags.some((tag) =>
          currentTags.includes(tag)
        );
        return hasCommonCategory || hasCommonTag;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();
  const postsToShow =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts
          .filter((post) => post._id !== currentPost._id)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);



  return (
    <section className={styles.relatedContent}>
      <h3 className={styles.title}>DAHA FAZLA İÇERİK</h3>

      <div className={styles.postsList}>
        {postsToShow.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.attributes.slug}`}
            className={styles.postItem}
          >
            <div className={styles.postImage}>
              <img
                src={post.attributes.img}
                alt={post.attributes.title}
                width={78}
                height={78}
                className={styles.image}
                loading="lazy"
              />
            </div>

            <div className={styles.postContent}>
              <p className={styles.postDesc}>
                {truncateDesc(post.attributes.desc)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
