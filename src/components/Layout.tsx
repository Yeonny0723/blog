import * as React from "react"
import { Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import ThemeToggle from "./ThemeToggle"

interface LayoutProps {
  location: PageProps["location"]
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <nav className="main-nav">
          <Link to="/" className="nav-logo">
            <StaticImage
              className="nav-logo-image"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../images/profile-pic.png"
              width={40}
              height={40}
              quality={95}
              alt="Blog logo"
            />
            <span className="nav-logo-text">{title}</span>
          </Link>
          <div className="nav-links">
            {/* 추가 메뉴 항목을 여기에 추가할 수 있습니다 */}
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}, All right reserved.</p>
        <p>
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
