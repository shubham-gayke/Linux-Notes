import { useAppStore } from '@/stores/useAppStore'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useAppStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 shadow-lg shadow-purple-500/20 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform duration-150"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
    </button>
  )
}
