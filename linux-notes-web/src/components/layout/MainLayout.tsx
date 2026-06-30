import React, { useEffect, useState, useRef } from "react"
import { useAppStore } from "@/stores/useAppStore"
import type { TocItem } from "@/utils/markdown"
import {
  Menu, ChevronRight, X,
  BookOpen, Terminal, Server, Network, Shield, HardDrive,
  Users, FileText, Settings, Layers, Monitor, Cpu, Lock,
  Clock, Archive, Package, Wifi, Key, ScrollText, Code2,
  ArrowUp, PanelLeftClose, PanelLeft
} from "lucide-react"

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

/* ─── Sidebar Item ─── */
function SidebarItem({ item, activeId, depth = 0 }: { item: TocItem; activeId: string | null; depth?: number }) {
  const { expandedChapters, toggleChapter } = useAppStore()
  const isExpanded = expandedChapters[item.id]
  const hasChildren = item.children.length > 0
  const isActive = activeId === item.id
  const isChapter = item.level === 2
  const Icon = isChapter ? getChapterIcon(item.text) : null
  const chapterNum = isChapter ? getChapterNumber(item.text) : null
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [isActive])

  const displayText = item.text

  return (
    <div ref={itemRef}>
      <div
        className={`
          group relative flex items-start gap-2.5 cursor-pointer select-none
          transition-colors duration-150 rounded-lg mx-2
          ${isChapter ? 'py-2.5 px-3 mb-0.5' : 'py-1.5 px-3 mb-px'}
          ${depth > 0 ? 'ml-4' : ''}
          ${isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }
        `}
        onClick={() => {
          if (hasChildren) toggleChapter(item.id)
          const el = document.getElementById(item.id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary" />
        )}

        {/* Chapter icon */}
        {Icon && (
          <div className={`
            flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs mt-0.5
            ${isActive
              ? 'bg-primary/20 text-primary'
              : 'bg-muted text-muted-foreground group-hover:text-foreground'
            }
            transition-colors duration-150
          `}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Subitem dot */}
        {!isChapter && depth > 0 && (
          <div className={`
            w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5
            ${isActive ? 'bg-primary' : 'bg-border group-hover:bg-muted-foreground'}
          `} />
        )}

        <span className={`
          flex-1 leading-relaxed
          ${isChapter ? 'text-[13px] font-semibold tracking-tight' : 'text-[12.5px] font-medium'}
        `}>
          {displayText}
        </span>

        {/* Expand/collapse chevron */}
        {hasChildren && (
          <div className={`flex-shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {/* Nested children */}
      {hasChildren && isExpanded && (
        <div className="overflow-hidden">
          <div className="relative ml-5 pl-3 border-l border-border/50">
            {item.children.map(child => (
              <SidebarItem key={child.id} item={child} activeId={activeId} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Sidebar ─── */
function Sidebar({ onClose }: { onClose?: () => void }) {
  const { toc, activeHeadingId, setExpandedChapters, expandedChapters } = useAppStore()

  useEffect(() => {
    if (toc.length > 0) {
      const all: Record<string, boolean> = {}
      toc.forEach(i => { all[i.id] = false })
      setExpandedChapters(all)
    }
  }, [toc, setExpandedChapters])

  useEffect(() => {
    if (!activeHeadingId) return
    
    // Find which chapter contains the currently active heading
    let activeChapterId: string | null = null
    for (const chapter of toc) {
      const isInChapter = chapter.id === activeHeadingId ||
        chapter.children.some(c => c.id === activeHeadingId || c.children?.some(cc => cc.id === activeHeadingId))
      
      if (isInChapter) {
        activeChapterId = chapter.id
        break
      }
    }

    if (activeChapterId) {
      // Check if we actually need to update to avoid unnecessary re-renders
      const needsUpdate = toc.some(chapter => {
        const shouldBeExpanded = chapter.id === activeChapterId
        return expandedChapters[chapter.id] !== shouldBeExpanded
      })

      if (needsUpdate) {
        const newExpandedState: Record<string, boolean> = {}
        toc.forEach(chapter => {
          newExpandedState[chapter.id] = chapter.id === activeChapterId
        })
        setExpandedChapters(newExpandedState)
      }
    }
  }, [activeHeadingId, toc, expandedChapters, setExpandedChapters])

  const chapterCount = toc.filter(t => t.text.toLowerCase().includes('chapter')).length

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-foreground">Shubham.DevOps</h2>
              <p className="text-[10px] text-muted-foreground font-medium">{chapterCount} Chapters · Linux</p>
            </div>
          </div>
          {/* Mobile close button */}
          {onClose && (
            <button onClick={onClose} className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-border" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-1">
        {toc.map(item => (
          <SidebarItem key={item.id} item={item} activeId={activeHeadingId} />
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="mx-4 h-px bg-border" />
      <div className="px-5 py-4">
        <div className="text-[10px] text-muted-foreground/60 font-medium">
          DevOps Track · Linux · Shell Scripting
        </div>
      </div>
    </div>
  )
}

/* ─── Reading Progress Bar ─── */
function ProgressBar({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)
          setScrollProgress(Math.min(progress * 100, 100))
          ticking = false
        })
        ticking = true
      }
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  return <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />
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

  if (!show) return null

  return (
    <button
      onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-150"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}

/* ─── Main Layout ─── */
export function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, toggleSidebar, theme } = useAppStore()
  const mainRef = useRef<HTMLElement>(null)

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="flex h-screen bg-dark-gradient relative overflow-hidden">

      {/* ─── Desktop Sidebar ─── */}
      {sidebarOpen && (
        <aside className="hidden lg:flex flex-col bg-sidebar border-r border-border flex-shrink-0 relative z-10 w-[280px]">
          <Sidebar />
        </aside>
      )}

      {/* ─── Mobile Sidebar Overlay ─── */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-[300px] bg-sidebar border-r border-border z-50 flex flex-col">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* ─── Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-[2]">

        {/* ─── Top Navigation ─── */}
        <header className="sticky top-0 z-30 bg-background border-b border-border relative">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14 relative z-10">
            {/* Left: menu + branding */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              </button>

              {/* Mobile menu */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-mono">{'>_'}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-foreground">Shubham.DevOps</span>
                  <span className="text-muted-foreground/40">/</span>
                  <span className="text-sm text-primary font-semibold">Linux</span>
                </div>
              </div>
            </div>

            {/* Right: empty or future actions */}
            <div className="flex items-center gap-2">
            </div>
          </div>

          {/* Reading progress bar */}
          <ProgressBar scrollRef={mainRef} />
        </header>

        {/* ─── Main Content ─── */}
        <div className="flex-1 flex overflow-hidden">
          <main
            ref={mainRef}
            className="flex-1 overflow-y-auto bg-transparent relative"
            id="main-content"
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
              {children}
            </div>
          </main>
        </div>
      </div>

      <ScrollToTop scrollRef={mainRef} />
    </div>
  )
}
