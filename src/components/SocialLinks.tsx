import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

interface SocialLink {
  platform: string
  url: string
  icon: string
  ariaLabel: string
}

interface SocialLinksProps {
  links?: SocialLink[]
}

const defaultLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yeonny0723",
    icon: "🔗",
    ariaLabel: "GitHub profile",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/juyeon-kim-6a227a207/",
    icon: "💼",
    ariaLabel: "LinkedIn profile",
  },
  {
    platform: "Tistory",
    url: "https://yeonny0723.tistory.com",
    icon: "📝",
    ariaLabel: "Tistory blog",
  },
]

const SocialLinks: React.FC<SocialLinksProps> = ({ links = defaultLinks }) => {
  return (
    <div className="social-links">
      {links.map(link => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          title={link.platform}
          aria-label={link.ariaLabel}
        >
          <span className="social-link-icon">{link.icon}</span>
          <span className="social-link-text">{link.platform}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
