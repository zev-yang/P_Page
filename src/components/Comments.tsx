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
          data-repo="zev-yang/P_Page"
          data-repo-id="R_kgDOLQxYQ"
          data-category="Comments"
          data-category-id="DIC_kwDOLQxYc4CdgqY"
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