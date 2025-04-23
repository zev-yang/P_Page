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
  category?: string
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
        tags: data.tags || [],
        category: data.category || 'Uncategorized'
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
      tags: data.tags || [],
      category: data.category || 'Uncategorized'
    }
  } catch {
    return null
  }
}

export type Tag = {
  name: string
  count: number
}

export type Category = {
  name: string
  count: number
}

export function getAllCategories(): Category[] {
  const posts = getAllPosts()
  const categories = posts.reduce((acc, post) => {
    const category = post.category || 'Uncategorized'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(categories).map(([name, count]) => ({
    name,
    count,
  }))
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts()
  return posts.filter((post) => (post.category || 'Uncategorized') === category)
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = getAllPosts()
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

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags?.includes(tag))
}

export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = getAllPosts()
  const otherPosts = posts.filter((post) => post.slug !== currentPost.slug)

  // 计算相关度分数
  const scoredPosts = otherPosts.map((post) => {
    let score = 0

    // 相同标签每个加 1 分
    const commonTags = post.tags?.filter((tag) =>
      currentPost.tags?.includes(tag)
    ).length
    score += commonTags || 0

    // 相同分类加 2 分
    if (post.category === currentPost.category) {
      score += 2
    }

    return { post, score }
  })

  // 按分数排序并返回前 limit 篇
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
} 