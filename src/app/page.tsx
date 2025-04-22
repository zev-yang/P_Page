import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
      <p className="text-xl mb-8 text-muted-foreground">
        A personal blog built with Next.js and Tailwind CSS
      </p>
      <div className="flex gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Read Blog
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          About Me
        </Link>
      </div>
    </div>
  )
} 