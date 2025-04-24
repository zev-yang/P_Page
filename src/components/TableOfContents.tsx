import React from 'react'
import { type TableOfContentsItem } from '@/lib/blog'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderItems = (items: TableOfContentsItem[], level: number = 0) => {
    return (
      <ul className={level > 0 ? 'ml-4' : ''}>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => scrollToHeading(item.id)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.title}
            </button>
            {item.items && renderItems(item.items, level + 1)}
          </li>
        ))}
      </ul>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <h2 className="mb-4 text-lg font-semibold">目录</h2>
      {renderItems(items)}
    </nav>
  )
} 