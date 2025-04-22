import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q?.toLowerCase() || ''
  const posts = await getAllPosts()
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        搜索结果：{searchParams.q}
      </h1>
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">没有找到相关文章</p>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border p-6 transition-colors hover:bg-muted/50"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
              </Link>
              <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
                <time>{post.date}</time>
                <span>•</span>
                <Link
                  href={`/blog/category/${post.category}`}
                  className="hover:text-foreground"
                >
                  {post.category}
                </Link>
              </div>
              <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
} 