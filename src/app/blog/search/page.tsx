'use client'

import React, { useState, useEffect } from 'react'
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query))
  )

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
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
    </main>
  )
} 