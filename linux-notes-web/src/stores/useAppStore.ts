import { create } from 'zustand'

interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

interface AppState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  
  toc: TocItem[]
  setToc: (toc: TocItem[]) => void
  
  activeHeadingId: string | null
  setActiveHeadingId: (id: string | null) => void
  
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  
  expandedChapters: Record<string, boolean>
  toggleChapter: (id: string) => void
  setExpandedChapters: (expanded: Record<string, boolean>) => void
  
  theme: string
  setTheme: (theme: string) => void
  
  forceRenderAll: boolean
  scrollToHeading: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  toc: [],
  setToc: (toc) => set({ toc }),
  
  activeHeadingId: null,
  setActiveHeadingId: (id) => set({ activeHeadingId: id }),
  
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  
  expandedChapters: {},
  toggleChapter: (id) => set((state) => ({
    expandedChapters: {
      ...state.expandedChapters,
      [id]: !state.expandedChapters[id]
    }
  })),
  setExpandedChapters: (expanded) => set({ expandedChapters: expanded }),
  
  theme: typeof window !== 'undefined' ? (localStorage.getItem('linux-theme-v2') || 'dark') : 'dark',
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('linux-theme-v2', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    set({ theme })
  },

  forceRenderAll: false,
  scrollToHeading: (id) => {
    set({ forceRenderAll: true })
    // Wait for the next tick for React to render the sections
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}))
