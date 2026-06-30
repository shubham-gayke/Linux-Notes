import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { useAppStore } from '@/stores/useAppStore'
import { extractHeadings } from '@/utils/markdown'
import { useScrollSpy } from '@/hooks/useScrollSpy'

/* ─── Loading Skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-full min-h-[70vh]">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <span className="text-white text-lg font-bold font-mono">{'>_'}</span>
        </div>
        <p className="text-sm text-foreground font-semibold mb-1">
          Loading Linux Documentation
        </p>
        <p className="text-xs text-muted-foreground">
          Preparing your notes...
        </p>
        <div className="mt-4 w-32 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse w-full" />
        </div>
      </div>
    </div>
  )
}

/* ─── App Content ─── */
function AppContent() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const { setToc } = useAppStore()

  useEffect(() => {
    fetch('/Linux_Comprehensive_Notes.md')
      .then(res => res.text())
      .then(text => {
        setContent(text)
        const toc = extractHeadings(text)
        setToc(toc)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load markdown:', err)
        setContent('# Error loading documentation\n\nPlease check if the markdown file exists in the public directory.')
        setLoading(false)
      })
  }, [setToc])

  if (loading) return <LoadingSkeleton />

  return <MarkdownRenderer content={content} />
}

/* ─── App Root ─── */
function App() {
  useScrollSpy()

  return (
    <MainLayout>
      <AppContent />
    </MainLayout>
  )
}

export default App

