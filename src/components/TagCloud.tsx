import * as React from "react"

interface Post {
  frontmatter?: {
    tags?: string[]
  }
}

interface TagCloudProps {
  posts: Post[]
  onTagClick?: (tag: string) => void
}

const TagCloud: React.FC<TagCloudProps> = ({ posts, onTagClick }) => {
  const getTagCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {}

    posts.forEach(post => {
      const tags = post.frontmatter?.tags || []
      tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })

    return counts
  }

  const tagCounts = getTagCounts()
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  if (tags.length === 0) {
    return null
  }

  const maxCount = Math.max(...tags.map(t => t.count))
  const minCount = Math.min(...tags.map(t => t.count))
  const countRange = maxCount - minCount || 1

  const getTagSize = (count: number): string => {
    if (countRange === 0) return "md"
    const normalized = (count - minCount) / countRange
    if (normalized <= 0.33) return "sm"
    if (normalized <= 0.66) return "md"
    return "lg"
  }

  return (
    <div className="sidebar-widget">
      <h3 className="sidebar-widget-title">태그</h3>
      <div className="tag-cloud">
        {tags.map(tag => (
          <button
            key={tag.name}
            className={`tag-cloud-item tag-size-${getTagSize(tag.count)}`}
            onClick={() => onTagClick?.(tag.name)}
            title={`${tag.count} posts`}
          >
            #{tag.name}
            <span className="tag-count">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagCloud
