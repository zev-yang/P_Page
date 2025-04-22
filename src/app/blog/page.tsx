import React from 'react'
import Link from 'next/link'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="mb-8 text-3xl font-bold">文章列表</h1>
          <div className="grid gap-6">
            {posts.map((post) => (
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
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold">分类</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog/category/${category.name}`}
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">标签</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blog/tag/${tag.name}`}
                  className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {tag.name}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
} 