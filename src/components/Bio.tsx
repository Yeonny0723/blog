/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio: React.FC = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: {
        author?: {
          name?: string
          summary?: string
        }
        social?: {
          twitter?: string
          github?: string
        }
      }
    }
  }>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.ts
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <div className="bio-content">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={80}
          height={80}
          quality={95}
          alt="Profile picture"
        />
        <div className="bio-text">
          {author?.name && (
            <p className="bio-intro">
              <strong>{author.name}</strong>
            </p>
          )}
          {author?.summary && (
            <p className="bio-summary">{author.summary}</p>
          )}
          {social?.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-github"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bio
