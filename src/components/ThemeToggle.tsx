import * as React from "react"
import { useTheme } from "../hooks/useTheme"

const ThemeToggle: React.FC = () => {
  const { getTheme, setTheme } = useTheme()
  const [theme, setThemeState] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const currentTheme = getTheme() as "light" | "dark"
    setThemeState(currentTheme)
    document.documentElement.dataset.theme = currentTheme
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    setThemeState(newTheme)
  }

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label="Theme Switch"
    >
      <div className="theme-switch-track" />
      <div className="theme-switch-thumb-wrapper">
        <div className="theme-switch-thumb" />
        <div className="theme-switch-shadow" />
      </div>
    </button>
  )
}

export default ThemeToggle
