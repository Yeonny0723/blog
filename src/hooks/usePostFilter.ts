import { useMemo } from "react"

interface Post {
  fields?: {
    slug: string
  }
  frontmatter?: {
    tags?: string[]
  }
}

const categoryMap: Record<string, string[]> = {
  전체: [],
  개발: ["개발", "튜토리얼"],
  오픈소스: ["오픈소스"],
  회고: ["에세이", "리뷰"],
}

const usePostFilter = (posts: Post[], activeCategory: string): Post[] => {
  return useMemo(() => {
    if (activeCategory === "전체") {
      return posts
    }

    const categoryTags = categoryMap[activeCategory] || []

    return posts.filter(post => {
      const postTags = post.frontmatter?.tags || []
      return postTags.some(tag => categoryTags.includes(tag))
    })
  }, [posts, activeCategory])
}

export default usePostFilter
