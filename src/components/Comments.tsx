import React from 'react'
import Script from 'next/script'

interface CommentsProps {
  slug: string
}

export function Comments({ slug }: CommentsProps) {
  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="mb-4 text-xl font-semibold">评论</h2>
      <div className="giscus-frame">
        <Script
          src="https://giscus.app/client.js"
          data-repo="[在此填入你的 GitHub 用户名]/[在此填入你的仓库名]"
          data-repo-id="[在此填入你的仓库 ID]"
          data-category="[在此填入你的分类名]"
          data-category-id="[在此填入你的分类 ID]"
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="preferred_color_scheme"
          data-lang="zh-CN"
          crossOrigin="anonymous"
          async
        />
      </div>
    </div>
  )
} 