import React from 'react'
import Link from 'next/link'
import { type Post } from '@/lib/blog'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="mb-4 text-xl font-semibold">相关文章</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <h3 className="mb-2 font-semibold group-hover:text-foreground">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 