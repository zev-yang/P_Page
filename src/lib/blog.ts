import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface Post {
  title: string
  date: string
  excerpt: string
  slug: string
  content: string
  readingTime: string
  tags?: string[]
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts(): Post[] {
  // 如果目录不存在，返回空数组
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const stats = readingTime(content)

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toLocaleDateString() : 'No date',
        excerpt: data.excerpt || '',
        content,
        readingTime: stats.text,
        tags: data.tags || []
      }
    })

  // Sort posts by date in descending order
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toLocaleDateString() : 'No date',
      excerpt: data.excerpt || '',
      content,
      readingTime: stats.text,
      tags: data.tags || []
    }
  } catch {
    return null
  }
}

export type TableOfContentsItem = {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export type Category = {
  name: string
  count: number
}

export type Tag = {
  name: string
  count: number
}

function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings = content.match(/^#{1,3} .+$/gm) || []
  const toc: TableOfContentsItem[] = []
  const stack: TableOfContentsItem[] = []

  headings.forEach((heading) => {
    const level = heading.match(/^#+/)?.[0].length || 1
    const title = heading.replace(/^#+\s+/, '')
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const item: TableOfContentsItem = {
      id,
      title,
      level,
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(item)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }

    stack.push(item)
  })

  return toc
}

export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts()
  const categories = posts.reduce((acc, post) => {
    const category = post.category
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(categories).map(([name, count]) => ({
    name,
    count,
  }))
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts()
  const tags = posts.reduce((acc, post) => {
    post.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tags).map(([name, count]) => ({
    name,
    count,
  }))
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags?.includes(tag))
}

export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getAllPosts()
  const otherPosts = posts.filter((post) => post.slug !== currentPost.slug)

  // 计算相关度分数
  const scoredPosts = otherPosts.map((post) => {
    let score = 0

    // 相同分类加 2 分
    if (post.category === currentPost.category) {
      score += 2
    }

    // 相同标签每个加 1 分
    const commonTags = post.tags?.filter((tag) =>
      currentPost.tags?.includes(tag)
    ).length
    score += commonTags || 0

    return { post, score }
  })

  // 按分数排序并返回前 limit 篇
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
} 