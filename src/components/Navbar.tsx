import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Search } from './Search'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">我的博客</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              首页
            </Link>
            <Link
              href="/blog"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/blog' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              文章
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-[200px] lg:w-[300px]">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 