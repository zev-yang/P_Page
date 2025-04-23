import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface Props {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="prose dark:prose-invert mx-auto">
        <h1>{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <time>{post.date}</time>
          <span>·</span>
          <Link
            href={`/blog/category/${post.category}`}
            className="hover:text-foreground"
          >
            {post.category}
          </Link>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          className="markdown-content"
        >
          {post.content}
        </ReactMarkdown>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t flex gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
} 