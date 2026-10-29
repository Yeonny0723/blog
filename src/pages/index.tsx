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
      }
    }>
  }
}

const BlogIndex: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // Skip empty drafts (no frontmatter title)
  const posts = data.allMarkdownRemark.nodes.filter(
    post => post.frontmatter?.title
  )

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol className="article-list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const date = post.frontmatter.date

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="article-list-item-header">
                  <h2 className="article-list-item-title">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">
                        {date ? `${date} ${title}` : title}
                      </span>
                    </Link>
                  </h2>
                </header>
                <section className="article-list-item-description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt || "",
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head: HeadFC<PageData> = ({ data }) => (
  <Seo title={data.site.siteMetadata?.title || "All posts"} />
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { lang: { ne: "en" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
