import * as React from "react"
import { Link, PageProps, useStaticQuery, graphql } from "gatsby"
import ThemeToggle from "./ThemeToggle"

interface LayoutProps {
  location: PageProps["location"]
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: {
        author?: { name?: string }
        social?: { github?: string }
      }
    }
  }>(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            github
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author?.name
  const github = data.site.siteMetadata?.social?.github

  return (
    <div className="root">
      <div className="container">
        <header className="site-header">
          <div className="site-header-title-wrapper">
            <div className="site-header-circle" />
            <h1 className="site-header-title">
              <Link to="/">{title}</Link>
            </h1>
          </div>
          <ThemeToggle />
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          © {github ? <a href={github}>{author}</a> : author}, Built with{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
