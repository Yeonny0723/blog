export function useTheme() {
  const isBrowser = typeof window !== "undefined"

  const getTheme = () =>
    isBrowser
      ? localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      : "light"

  const setTheme = (theme: "light" | "dark") => {
    localStorage.setItem("theme", theme)
    document.documentElement.dataset.theme = theme
  }

  return { getTheme, setTheme }
}

