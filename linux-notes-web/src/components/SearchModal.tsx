import { useState, useMemo, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Search, FileText, Hash, ArrowRight, Command } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import Fuse from 'fuse.js'

interface SearchItem {
  id: string
  title: string
  type: 'heading' | 'content'
  content?: string
}

export function SearchModal({ markdownContent }: { markdownContent: string }) {
  const { searchOpen, setSearchOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Build search index
  const searchIndex = useMemo(() => {
    if (!markdownContent) return []
    const lines = markdownContent.split('\n')
    const items: SearchItem[] = []

    let currentHeadingId = ''
    let currentHeadingText = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
      if (headingMatch) {
        currentHeadingText = headingMatch[2]
        currentHeadingId = currentHeadingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        items.push({ id: currentHeadingId, title: currentHeadingText, type: 'heading' })
      } else if (currentHeadingId && line.length > 20 && !line.startsWith('```') && !line.startsWith('|')) {
        items.push({
          id: currentHeadingId,
          title: currentHeadingText,
          type: 'content',
          content: line.substring(0, 120) + (line.length > 120 ? '...' : '')
        })
      }
    }
    return items
  }, [markdownContent])

  const fuse = useMemo(() => new Fuse(searchIndex, {
    keys: ['title', 'content'],
    threshold: 0.3,
    includeMatches: true
  }), [searchIndex])

  const results = useMemo(() => {
    if (!query) return []
    return fuse.search(query).slice(0, 8)
  }, [query, fuse])

  // Reset selection when results change
  useEffect(() => setSelectedIndex(0), [results])

  // Keyboard navigation
  useEffect(() => {
    if (!searchOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex].item.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, results, selectedIndex])

  const handleSelect = (id: string) => {
    setSearchOpen(false)
    setQuery('')
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="
        sm:max-w-[640px] p-0 overflow-hidden gap-0
        bg-background/40 dark:bg-black/40
        backdrop-blur-2xl border-white/20 dark:border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        rounded-2xl
      ">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-primary flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="
              flex-1 bg-transparent border-none outline-none
              text-base text-foreground placeholder:text-muted-foreground/60
              font-medium drop-shadow-sm
            "
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded-lg border border-white/10 bg-black/10 dark:bg-white/10 px-2 font-mono text-[10px] font-medium text-foreground opacity-80">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto">
          {query && results.length === 0 && (
            <div
              className="py-16 text-center animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center">
                <Search className="w-5 h-5 text-muted-foreground/60" />
              </div>
              <p className="text-sm text-foreground/80 font-medium">No results found for "{query}"</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {results.map((result, i) => (
                <button
                  key={`${result.item.id}-${i}`}
                  className={`
                    w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3.5
                    transition-all duration-150 group
                    ${i === selectedIndex
                      ? 'bg-white/40 dark:bg-white/10 shadow-sm'
                      : 'hover:bg-white/20 dark:hover:bg-white/5'
                    }
                  `}
                  onClick={() => handleSelect(result.item.id)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                    ${i === selectedIndex
                      ? 'bg-primary/20 text-primary'
                      : 'bg-black/5 dark:bg-white/5 text-muted-foreground'
                    }
                    transition-colors duration-150
                  `}>
                    {result.item.type === 'heading'
                      ? <Hash className="w-3.5 h-3.5" />
                      : <FileText className="w-3.5 h-3.5" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`
                      text-sm font-medium truncate drop-shadow-sm
                      ${i === selectedIndex ? 'text-foreground' : 'text-foreground/80'}
                    `}>
                      {result.item.title}
                    </div>
                    {result.item.content && (
                      <div className="text-xs text-muted-foreground/70 truncate mt-0.5">
                        {result.item.content}
                      </div>
                    )}
                  </div>

                  {i === selectedIndex && (
                    <div className="flex-shrink-0 text-primary animate-in fade-in slide-in-from-left-2 duration-200">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="py-16 text-center animate-in fade-in duration-200">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <Command className="w-5 h-5 text-primary/60" />
              </div>
              <p className="text-sm text-foreground/80 font-medium drop-shadow-sm">Search the Linux documentation</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Type to search headings and content</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 text-[11px] text-muted-foreground/60 bg-black/5 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="w-4 h-4 rounded border border-white/10 bg-black/10 dark:bg-white/10 flex items-center justify-center text-[9px] text-foreground opacity-80">↑</kbd>
              <kbd className="w-4 h-4 rounded border border-white/10 bg-black/10 dark:bg-white/10 flex items-center justify-center text-[9px] text-foreground opacity-80">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="h-4 rounded border border-white/10 bg-black/10 dark:bg-white/10 flex items-center justify-center text-[9px] px-1 text-foreground opacity-80">↵</kbd>
              select
            </span>
          </div>
          <span className="font-mono">
            {results.length > 0 ? `${results.length} results` : ''}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
