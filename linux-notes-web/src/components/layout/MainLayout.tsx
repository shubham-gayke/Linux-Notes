import React, { useEffect, useState, useCallback, useRef } from "react"
import { useAppStore } from "@/stores/useAppStore"
import type { TocItem } from "@/utils/markdown"
import {
  Menu, Search, Moon, Sun, ChevronRight,
  BookOpen, Terminal, Server, Network, Shield, HardDrive,
  Users, FileText, Settings, Layers, Monitor, Cpu, Lock,
  Clock, Archive, Package, Wifi, Key, ScrollText, Code2,
  ArrowUp, PanelLeftClose, PanelLeft, Printer
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

/* ─── Chapter Icon Mapping ─── */
const chapterIcons: Record<string, React.ElementType> = {
  'operating': Monitor,
  'linux-introduction': Terminal,
  'linux-architecture': Layers,
  'virtualization': Server,
  'prompt': Terminal,
  'basic-linux': Code2,
  'file-creation': FileText,
  'vim': Code2,
  'file-read': ScrollText,
  'directory': HardDrive,
  'user-and-group': Users,
  'file-permissions': Shield,
  'sudo': Lock,
  'job-scheduling': Clock,
  'archive': Archive,
  'package': Package,
  'disk': HardDrive,
  'networking': Network,
  'osi': Layers,
  'ip-addressing': Wifi,
  'network-configuration': Settings,
  'firewall': Shield,
  'ssh': Key,
  'log': ScrollText,
  'process': Cpu,
  'text-processing': FileText,
  'shell-scripting': Terminal,
}

function getChapterIcon(text: string): React.ElementType {
  const lower = text.toLowerCase()
  for (const [key, icon] of Object.entries(chapterIcons)) {
    if (lower.includes(key)) return icon
  }
  return BookOpen
}

function getChapterNumber(text: string): string | null {
  const match = text.match(/Chapter\s+(\d+)/i)
  return match ? match[1] : null
}

/* ─── Sidebar Item with Premium Styling ─── */
function SidebarItem({ item, activeId, depth = 0 }: { item: TocItem; activeId: string | null; depth?: number }) {
  const { expandedChapters, toggleChapter } = useAppStore()
  const isExpanded = expandedChapters[item.id]
  const hasChildren = item.children.length > 0
  const isActive = activeId === item.id
  const isChapter = item.level === 2
  const Icon = isChapter ? getChapterIcon(item.text) : null
  const chapterNum = isChapter ? getChapterNumber(item.text) : null
  const itemRef = useRef<HTMLDivElement>(null)

  // Auto-scroll active item into view
  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [isActive])

  // Clean display text: remove "Chapter N:" prefix for cleaner sidebar
  const displayText = isChapter
    ? item.text.replace(/^Chapter\s+\d+:\s*/i, '')
    : item.text

  return (
    <div ref={itemRef}>
      <motion.div
        className={`
          group relative flex items-center gap-2.5 cursor-pointer select-none
          transition-all duration-200 ease-out rounded-lg mx-2
          ${isChapter ? 'py-2.5 px-3 mb-0.5' : 'py-1.5 px-3 mb-px'}
          ${depth > 0 ? 'ml-4' : ''}
          ${isActive
            ? 'bg-primary/10 text-primary dark:bg-primary/15'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }
        `}
        onClick={() => {
          if (hasChildren) toggleChapter(item.id)
          const el = document.getElementById(item.id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Active indicator bar */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}

        {/* Chapter icon */}
        {Icon && (
          <div className={`
            flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs
            ${isActive
              ? 'bg-primary/20 text-primary'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
            }
            transition-colors duration-200
          `}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Subitem dot */}
        {!isChapter && depth > 0 && (
          <div className={`
            w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200
            ${isActive ? 'bg-primary' : 'bg-border group-hover:bg-muted-foreground'}
          `} />
        )}

        <span className={`
          flex-1 truncate transition-colors duration-200
          ${isChapter ? 'text-[13px] font-semibold tracking-tight' : 'text-[12.5px] font-medium'}
        `}>
          {displayText}
        </span>

        {/* Chapter number badge */}
        {chapterNum && (
          <span className={`
            text-[10px] font-mono font-bold rounded-md px-1.5 py-0.5 flex-shrink-0
            ${isActive
              ? 'bg-primary/20 text-primary'
              : 'bg-muted text-muted-foreground/60'
            }
            transition-colors duration-200
          `}>
            {chapterNum}
          </span>
        )}

        {/* Expand/collapse chevron */}
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0"
          >
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          </motion.div>
        )}
      </motion.div>

      {/* Nested children */}
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="relative ml-5 pl-3 border-l border-border/50">
              {item.children.map(child => (
                <SidebarItem key={child.id} item={child} activeId={activeId} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Sidebar ─── */
function Sidebar() {
  const { toc, activeHeadingId, setExpandedChapters, expandedChapters } = useAppStore()

  useEffect(() => {
    if (toc.length > 0) {
      const all: Record<string, boolean> = {}
      toc.forEach(i => { all[i.id] = false })
      setExpandedChapters(all)
    }
  }, [toc, setExpandedChapters])

  // Auto-expand the chapter that contains the active heading
  useEffect(() => {
    if (!activeHeadingId) return
    for (const chapter of toc) {
      const isInChapter = chapter.id === activeHeadingId ||
        chapter.children.some(c => c.id === activeHeadingId || c.children?.some(cc => cc.id === activeHeadingId))
      if (isInChapter && !expandedChapters[chapter.id]) {
        useAppStore.getState().toggleChapter(chapter.id)
      }
    }
  }, [activeHeadingId, toc])

  const chapterCount = toc.filter(t => t.text.toLowerCase().includes('chapter')).length

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center shadow-lg shadow-primary/20">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-foreground">Linux Notes</h2>
            <p className="text-[10px] text-muted-foreground font-medium">{chapterCount} Chapters</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-1">
        {toc.map(item => (
          <SidebarItem key={item.id} item={item} activeId={activeHeadingId} />
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="px-5 py-4">
        <div className="text-[10px] text-muted-foreground/60 font-medium">
          DevOps Track · Linux · Shell Scripting
        </div>
      </div>
    </div>
  )
}

/* ─── Theme Toggle ─── */
function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </motion.button>
  )
}

/* ─── Scroll to Top Button ─── */
function ScrollToTop({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => setShow(el.scrollTop > 500)
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full glass border border-border/50 shadow-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─── Right Sidebar (On This Page) ─── */
function RightSidebar({ activeId }: { activeId: string | null }) {
  const { toc } = useAppStore()

  // Get current chapter's subheadings
  let currentChapter: TocItem | null = null
  for (const chapter of toc) {
    if (chapter.id === activeId) { currentChapter = chapter; break }
    for (const sub of chapter.children) {
      if (sub.id === activeId) { currentChapter = chapter; break }
      for (const subsub of sub.children || []) {
        if (subsub.id === activeId) { currentChapter = chapter; break }
      }
      if (currentChapter) break
    }
    if (currentChapter) break
  }

  if (!currentChapter || currentChapter.children.length === 0) return null

  return (
    <div className="py-8 px-4">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-4 px-2">
        On this page
      </h3>
      <nav className="space-y-0.5">
        {currentChapter.children.map(sub => {
          const isActive = sub.id === activeId
          return (
            <a
              key={sub.id}
              href={`#${sub.id}`}
              className={`
                block px-3 py-1.5 text-[12px] rounded-md transition-all duration-200
                ${isActive
                  ? 'text-primary font-medium bg-primary/5'
                  : 'text-muted-foreground/70 hover:text-foreground hover:bg-muted/30'
                }
              `}
            >
              {sub.text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}

/* ─── Main Layout ─── */
export function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar, setSearchOpen, activeHeadingId } = useAppStore()
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainRef = useRef<HTMLElement>(null)

  // Ctrl+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSearchOpen])

  // Track scroll progress
  const handleScroll = useCallback(() => {
    const el = mainRef.current
    if (!el) return
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)
    setScrollProgress(Math.min(progress * 100, 100))
  }, [])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="flex h-screen bg-background noise-overlay relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* ─── Desktop Sidebar ─── */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-col border-r border-border/50 glass flex-shrink-0 relative z-10 overflow-hidden"
          >
            <Sidebar />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-[2]">

        {/* ─── Premium Top Navigation ─── */}
        <header className="sticky top-0 z-30 glass border-b border-border/50 relative">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            {/* Left: menu + branding */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              </motion.button>

              {/* Mobile menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center shadow-md shadow-primary/20">
                  <Terminal className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-bold tracking-tight">DevMastery</span>
                  <span className="text-muted-foreground/50 mx-1.5">/</span>
                  <span className="text-sm text-muted-foreground font-medium">Linux</span>
                </div>
              </div>
            </div>

            {/* Center / Right: search + actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearchOpen(true)}
                className="
                  flex items-center gap-2 h-9 px-3 pr-2 rounded-xl border border-border/50
                  bg-muted/30 hover:bg-muted/50 text-muted-foreground text-sm
                  transition-all duration-200 w-48 sm:w-64
                "
              >
                <Search className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="flex-1 text-left text-xs">Search docs...</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded-md border border-border/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground/60">
                  ⌘K
                </kbd>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="no-print relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
                title="Download as PDF"
                aria-label="Download as PDF"
              >
                <Printer className="w-4 h-4" />
              </motion.button>
              <ThemeToggle />
            </div>
          </div>

          {/* Reading progress bar */}
          <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />
        </header>

        {/* ─── Main + Right Sidebar ─── */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main content */}
          <main
            ref={mainRef}
            className="flex-1 overflow-y-auto scroll-smooth bg-grid-pattern"
            id="main-content"
          >
            <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
              {children}
            </div>
          </main>

          {/* Right sidebar — On This Page */}
          <aside className="hidden xl:block w-56 border-l border-border/30 overflow-y-auto flex-shrink-0">
            <RightSidebar activeId={activeHeadingId} />
          </aside>
        </div>
      </div>

      <ScrollToTop scrollRef={mainRef} />
    </div>
  )
}
