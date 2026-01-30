import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SocialLinks from "./SocialLinks"

const ProfileCard: React.FC = () => {
  const data = useStaticQuery(graphql`
    query ProfileCardQuery {
      site {
        siteMetadata {
          author {
            name
            title
            summary
          }
          social {
            github
            linkedin
            tistory
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social || {}

  if (!author) {
    return null
  }

  const socialLinks = [
    {
      platform: "GitHub",
      url: social.github || "",
      icon: "🔗",
      ariaLabel: "GitHub profile",
    },
    {
      platform: "LinkedIn",
      url: social.linkedin || "",
      icon: "💼",
      ariaLabel: "LinkedIn profile",
    },
    {
      platform: "Tistory",
      url: social.tistory || "",
      icon: "📝",
      ariaLabel: "Tistory blog",
    },
  ]

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <StaticImage
          className="profile-card-image"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={80}
          height={80}
          quality={95}
          alt={`${author.name} profile picture`}
        />
      </div>
      <div className="profile-card-content">
        <h1 className="profile-card-name">{author.name}</h1>
        {author.title && <p className="profile-card-title">{author.title}</p>}
        {author.summary && <p className="profile-card-bio">{author.summary}</p>}
        <SocialLinks links={socialLinks} />
      </div>
    </div>
  )
}

export default ProfileCard
