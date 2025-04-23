const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const readingTime = require('reading-time')

const postsDirectory = path.join(process.cwd(), 'src/content/blog')
const outputDirectory = path.join(process.cwd(), 'public/api')

function getAllPosts() {
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

  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true })
}

// Generate the posts JSON file
const posts = getAllPosts()
fs.writeFileSync(
  path.join(outputDirectory, 'posts.json'),
  JSON.stringify(posts, null, 2)
) 