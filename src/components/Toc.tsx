// src/components/Toc.tsx
import * as React from "react"

interface TocItem {
  url: string
  title: string
  items?: TocItem[]
}

interface TocProps {
  toc?: string | TocItem
}

export default function Toc({ toc }: TocProps) {
  if (!toc) return null

  // If toc is a string (HTML from gatsby-transformer-remark), render it directly
  if (typeof toc === "string") {
    return (
      <nav
        className="table-of-contents"
        dangerouslySetInnerHTML={{ __html: toc }}
      />
    )
  }

  // If toc is an object (from gatsby-plugin-mdx), render it as a list
  if (!toc.items) return null

  return (
    <nav className="table-of-contents">
      <ul>
        {toc.items.map(item => (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>

            {item.items && (
              <ul>
                {item.items.map(child => (
                  <li key={child.url}>
                    <a href={child.url}>{child.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
