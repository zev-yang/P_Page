'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Post {
  title: string
  date: string
  excerpt: string
  slug: string
  content: string
  readingTime: string
  tags?: string[]
  category?: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    // In static export, we'll access the JSON file directly
    fetch('/P_Page/api/posts.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error))
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query))
  )

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        搜索结果：{query}
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
                {post.tags?.map((tag) => (
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
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-64 bg-muted rounded mb-8"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-muted rounded"></div>
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults />
      </Suspense>
    </main>
  )
} 