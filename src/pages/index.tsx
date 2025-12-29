import * as React from "react"
import { Link, graphql, PageProps, HeadFC } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

interface PageData {
  site: {
    siteMetadata?: {
      title?: string
    }
  }
  allMarkdownRemark: {
    nodes: Array<{
      excerpt?: string
      fields: {
        slug: string
      }
      frontmatter: {
        date?: string
        title?: string
        description?: string
        tags?: string[]
      }
    }>
  }
}

const BlogIndex: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <div className="home-hero">
          <Bio />
        </div>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.ts).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="home-hero">
        <h1 className="hero-title">{siteTitle}</h1>
        <Bio />
      </div>

      <section className="latest-posts">
        <h2 className="section-title">새로운 소식</h2>
        <p className="section-subtitle">최신 포스트를 살펴보세요</p>
        <ul className="post-list">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            const tags = post.frontmatter.tags || []

            // 태그를 이모지로 매핑
            const tagEmojiMap: Record<string, string> = {
              개발: "🪜",
              에세이: "🐰",
              리뷰: "💼",
              튜토리얼: "📚",
              gatsby: "⚛️",
              react: "⚛️",
              typescript: "📘",
            }

            const firstTag = tags.length > 0 ? tags[0] : ""
            const tagEmoji =
              firstTag && tagEmojiMap[firstTag]
                ? tagEmojiMap[firstTag]
                : tags.length > 0
                ? "📝"
                : "📝"

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-card"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link
                    to={post.fields.slug}
                    className="post-link"
                    itemProp="url"
                  >
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
                          __html:
                            post.frontmatter.description || post.excerpt || "",
                        }}
                        itemProp="description"
                      />
                      <time
                        className="post-date"
                        dateTime={post.frontmatter.date || ""}
                      >
                        {post.frontmatter.date}
                      </time>
                    </div>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > 5 && (
          <Link to="/" className="more-link">
            더 살펴보기
          </Link>
        )}
      </section>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: HeadFC<PageData> = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          tags
        }
      }
    }
  }
`
