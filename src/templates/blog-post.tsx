import * as React from "react"
import { Link, graphql, PageProps, HeadFC } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

interface NavPost {
  fields: { slug: string }
  frontmatter: { title: string; date?: string }
}

interface PageData {
  previous?: NavPost
  next?: NavPost
  site: {
    siteMetadata?: {
      title?: string
    }
  }
  markdownRemark: {
    id: string
    excerpt?: string
    html: string
    tableOfContents?: string
    frontmatter: {
      title: string
      date?: string
      description?: string
      tags?: string[]
      lang?: string
      translation?: string
    }
  }
}

const withDate = (post: NavPost) =>
  post.frontmatter.date
    ? `${post.frontmatter.date} ${post.frontmatter.title}`
    : post.frontmatter.title

const BlogPostTemplate: React.FC<PageProps<PageData>> = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const { title, date, tags, lang, translation } = post.frontmatter

  return (
    <Layout location={location} title={siteTitle}>
      <article className="post" itemScope itemType="http://schema.org/Article">
        <header className="post-header">
          <h1 className="post-title" itemProp="headline">
            {date ? `${date} ${title}` : title}
          </h1>
          <div className="post-meta">
            {date && <span>{date}</span>}
            {tags && tags.length > 0 && (
              <ul className="post-tags">
                {tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
          {translation && (
            <p className="post-translation-link">
              <Link to={translation}>
                {lang === "en" ? "한국어로 읽기" : "Read in English"}
              </Link>
            </p>
          )}
        </header>
        {post.tableOfContents && (
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          />
        )}
        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <footer className="post-footer">
          <Bio />
        </footer>
      </article>
      <nav className="post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {withDate(previous)}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {withDate(next)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head: HeadFC<PageData> = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
        lang
        translation
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
