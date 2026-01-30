import * as React from "react"
import CategoryWidget from "./CategoryWidget"
import FeaturedPosts from "./FeaturedPosts"
import TagCloud from "./TagCloud"

interface Post {
  fields?: {
    slug: string
  }
  frontmatter?: {
    title?: string
    date?: string
    tags?: string[]
    featured?: boolean
  }
}

interface SidebarProps {
  posts: Post[]
  activeCategory?: string
  onCategoryClick?: (category: string) => void
  onTagClick?: (tag: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  posts,
  activeCategory = "전체",
  onCategoryClick,
  onTagClick,
}) => {
  return (
    <aside className="home-sidebar">
      <CategoryWidget
        posts={posts}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />
      <FeaturedPosts posts={posts} />
      <TagCloud posts={posts} onTagClick={onTagClick} />
    </aside>
  )
}

export default Sidebar
