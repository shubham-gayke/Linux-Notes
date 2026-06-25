import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { SearchModal } from '@/components/SearchModal'
import { useAppStore } from '@/stores/useAppStore'
import { extractHeadings } from '@/utils/markdown'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

/* ─── Premium Loading Skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-full min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated logo */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(124, 58, 237, 0.2)',
              '0 0 0 20px rgba(124, 58, 237, 0)',
              '0 0 0 0 rgba(124, 58, 237, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="
            w-16 h-16 mx-auto mb-6 rounded-2xl
            bg-gradient-to-br from-primary to-sky-400
            flex items-center justify-center
            shadow-xl shadow-primary/20
          "
        >
          <Terminal className="w-7 h-7 text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground font-medium"
        >
          Loading documentation...
        </motion.p>

        {/* Loading bar */}
        <motion.div className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
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

  useScrollSpy()

  if (loading) return <LoadingSkeleton />

  return (
    <>
      <MarkdownRenderer content={content} />
      <SearchModal markdownContent={content} />
    </>
  )
}

/* ─── App Root ─── */
function App() {
  return (
    <MainLayout>
      <AppContent />
    </MainLayout>
  )
}

export default App
