/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import type { GatsbySSR } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: `en` })

  // Set initial theme to prevent flash of wrong theme
  setHeadComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: {
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.dataset.theme = theme;
            } catch (e) {}
          })();
        `,
      },
    }),
  ])
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return React.createElement(MDXProvider, null, element)
}
