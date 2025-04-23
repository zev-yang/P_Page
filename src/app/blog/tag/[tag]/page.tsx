import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/blog'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.name,
  }))
}

export default async function TagPage({
  params,
}: {
  params: { tag: string }
}) {
  const [posts, tags] = await Promise.all([
    getPostsByTag(params.tag),
    getAllTags(),
  ])

  if (posts.length === 0) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="mb-8 text-3xl font-bold">标签：{params.tag}</h1>
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
                  {post.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className={`rounded-full px-3 py-1 text-sm ${
                        tag === params.tag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside>
          <h2 className="mb-4 text-xl font-semibold">所有标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog/tag/${tag.name}`}
                className={`rounded-full px-3 py-1 text-sm ${
                  tag.name === params.tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {tag.name}
                <span className="ml-1 text-xs text-muted-foreground">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
} 