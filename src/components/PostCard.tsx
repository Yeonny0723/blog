import * as React from "react"
import { Link } from "gatsby"

interface PostCardProps {
  slug: string
  title: string
  date: string
  description?: string
  excerpt?: string
  tags?: string[]
  category?: string
}

const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  date,
  description,
  excerpt,
  tags = [],
  category,
}) => {
  const tagEmojiMap: Record<string, string> = {
    개발: "☀️",
    에세이: "🐰",
    리뷰: "🎸",
    튜토리얼: "📚",
    오픈소스: "🚀",
  }

  const firstTag = tags.length > 0 ? tags[0] : ""
  const tagEmoji =
    firstTag && tagEmojiMap[firstTag]
      ? tagEmojiMap[firstTag]
      : tags.length > 0
      ? "📝"
      : "📝"

  return (
    <li>
      <article
        className="post-card"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Link to={slug} className="post-link" itemProp="url">
          <div className="post-content">
            {firstTag && (
              <span className="post-category">
                {firstTag}
                {tagEmoji}
              </span>
            )}
            <h3 className="post-title" itemProp="headline">
              {title}
            </h3>
            <p
              className="post-description"
              dangerouslySetInnerHTML={{
                __html: description || excerpt || "",
              }}
              itemProp="description"
            />
            <div className="post-footer">
              {tags.length > 0 && (
                <div className="post-tag-pills">
                  {tags.map(tag => (
                    <span key={tag} className="post-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <time className="post-date" dateTime={date || ""}>
                {date}
              </time>
            </div>
          </div>
        </Link>
      </article>
    </li>
  )
}

export default PostCard
