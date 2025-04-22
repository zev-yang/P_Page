import React from 'react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src="/avatar.jpg"
            alt="头像"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">你的名字</h1>
          <p className="text-xl text-muted-foreground">
            这里写一句简短的个人介绍
          </p>
        </div>
      </div>
    </main>
  )
} 