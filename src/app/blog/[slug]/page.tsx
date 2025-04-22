import { getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'

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
    <article className="prose dark:prose-invert mx-auto">
      <h1>{post.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        {post.date} · {post.readingTime}
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
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
} 