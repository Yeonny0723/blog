import * as React from "react"
import { Link } from "gatsby"

interface NavigationProps {
  currentPath?: string
}

const Navigation: React.FC<NavigationProps> = ({ currentPath = "/" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const menuItems = [
    { label: "홈", path: "/" },
    { label: "글", path: "/" },
    { label: "소개", path: "/about/" },
    { label: "방명록", path: "/guestbook/" },
  ]

  const isActive = (path: string): boolean => {
    if (path === "/" && (currentPath === "/" || currentPath === "/posts/")) {
      return true
    }
    return currentPath.startsWith(path) && path !== "/"
  }

  return (
    <>
      <nav className="main-nav-menu">
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu-list ${mobileMenuOpen ? "open" : ""}`}>
          <button
            className="nav-close-button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <ul>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-menu-item ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navigation
