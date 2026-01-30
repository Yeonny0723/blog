import * as React from "react"

interface Post {
  fields?: {
    slug: string
  }
  frontmatter?: {
    tags?: string[]
  }
}

interface CategoryWidgetProps {
  posts: Post[]
  activeCategory?: string
  onCategoryClick?: (category: string) => void
}

const categories = [
  { name: "전체", label: "전체" },
  { name: "개발", label: "개발" },
  { name: "오픈소스", label: "오픈소스" },
  { name: "회고", label: "회고" },
]

const categoryMap: Record<string, string[]> = {
  전체: [],
  개발: ["개발", "튜토리얼"],
  오픈소스: ["오픈소스"],
  회고: ["에세이", "리뷰"],
}

const CategoryWidget: React.FC<CategoryWidgetProps> = ({
  posts,
  activeCategory = "전체",
  onCategoryClick,
}) => {
  const getCategoryCount = (category: string): number => {
    if (category === "전체") {
      return posts.length
    }

    const tags = categoryMap[category] || []
    return posts.filter(post => {
      const postTags = post.frontmatter?.tags || []
      return postTags.some(tag => tags.includes(tag))
    }).length
  }

  return (
    <div className="sidebar-widget">
      <h3 className="sidebar-widget-title">카테고리</h3>
      <div className="category-widget-content">
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`category-pill ${
              activeCategory === cat.name ? "active" : ""
            }`}
            onClick={() => onCategoryClick?.(cat.name)}
          >
            <span className="category-pill-name">{cat.label}</span>
            <span className="category-pill-count">
              ({getCategoryCount(cat.name)})
            </span>
          </button>
        ))}
      </div>
      <a href="#" className="category-widget-link">
        모든 글 보기 →
      </a>
    </div>
  )
}

export default CategoryWidget
