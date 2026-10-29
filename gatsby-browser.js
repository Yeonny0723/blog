// custom typefaces
import "pretendard/dist/web/static/pretendard.css"
import "@fontsource/fira-code"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles (includes Prism VS Code Dark+ theme)
import "./src/style.css"

import React from "react"
import { MDXProvider } from "@mdx-js/react"

export const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>
}
