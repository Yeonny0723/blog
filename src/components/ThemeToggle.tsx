import * as React from "react"
import { useTheme } from "../hooks/useTheme"

const ThemeToggle: React.FC = () => {
  const { getTheme, setTheme } = useTheme()
  const [theme, setThemeState] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const currentTheme = getTheme()
    setThemeState(currentTheme as "light" | "dark")
    document.documentElement.dataset.theme = currentTheme
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    setThemeState(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  )
}

export default ThemeToggle

