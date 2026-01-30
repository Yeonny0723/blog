import * as React from "react"
import { Link } from "gatsby"

interface Post {
  fields?: {
    slug: string
  }
  frontmatter?: {
    title?: string
    date?: string
    featured?: boolean
  }
}

interface FeaturedPostsProps {
  posts: Post[]
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const featuredPosts = posts.filter(post => post.frontmatter?.featured)

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <div className="sidebar-widget">
      <h3 className="sidebar-widget-title">주인장 픽</h3>
      <ul className="featured-posts-list">
        {featuredPosts.slice(0, 5).map(post => (
          <li key={post.fields?.slug} className="featured-post-item">
            <Link to={post.fields?.slug || "/"} className="featured-post-link">
              <div className="featured-post-content">
                <h4 className="featured-post-title">
                  {post.frontmatter?.title}
                </h4>
                <time className="featured-post-date">
                  {post.frontmatter?.date}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedPosts
