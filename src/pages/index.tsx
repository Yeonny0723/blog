import * as React from "react"
import { graphql, PageProps, HeadFC } from "gatsby"

import ProfileCard from "../components/ProfileCard"
import CategoryFilter from "../components/CategoryFilter"
import PostCard from "../components/PostCard"
import Sidebar from "../components/Sidebar"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import usePostFilter from "../hooks/usePostFilter"

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
        featured?: boolean
      }
    }>
  }
}

const BlogIndex: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [activeCategory, setActiveCategory] = React.useState("전체")

  const filteredPosts = usePostFilter(posts, activeCategory)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <div className="home-hero">
          <ProfileCard />
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
        <ProfileCard />
      </div>

      <div className="home-layout">
        <div className="home-main-content">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <section className="latest-posts">
            <ul className="post-list">
              {filteredPosts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                const tags = post.frontmatter.tags || []

                return (
                  <PostCard
                    key={post.fields.slug}
                    slug={post.fields.slug}
                    title={title}
                    date={post.frontmatter.date || ""}
                    description={post.frontmatter.description}
                    excerpt={post.excerpt}
                    tags={tags}
                  />
                )
              })}
            </ul>
          </section>
        </div>

        <Sidebar
          posts={posts}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
      </div>
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
          featured
        }
      }
    }
  }
`
