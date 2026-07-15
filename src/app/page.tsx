import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight">
          Derniers articles
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
