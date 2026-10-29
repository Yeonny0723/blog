import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
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
          github?: string
          linkedin?: string
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
            github
            linkedin
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="profile">
      <StaticImage
        className="profile-image"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={70}
        height={70}
        quality={95}
        alt="Profile picture"
      />
      <div className="profile-wrapper">
        <p className="profile-name">
          <strong>{author?.name}</strong>
        </p>
        {author?.summary && (
          <p className="profile-description">{author.summary}</p>
        )}
        <ul className="profile-links">
          <li>
            <Link to="/about/">About</Link>
          </li>
          {social?.github && (
            <li>
              <a href={social.github}>GitHub</a>
            </li>
          )}
          {social?.linkedin && (
            <li>
              <a href={social.linkedin}>LinkedIn</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Bio
