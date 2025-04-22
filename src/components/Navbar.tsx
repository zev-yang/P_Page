"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false
    return pathname.startsWith(path)
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            My Blog
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/blog"
              className={`hover:text-primary transition-colors ${
                isActive('/blog') ? 'text-primary font-medium' : ''
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`hover:text-primary transition-colors ${
                isActive('/about') ? 'text-primary font-medium' : ''
              }`}
            >
              About
            </Link>
          </div>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </nav>
  )
} 