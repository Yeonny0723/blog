// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from "react"
import { MDXProvider } from "@mdx-js/react"

export const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>
}
