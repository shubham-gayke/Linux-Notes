import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export function useScrollSpy(headingSelector: string = 'h1, h2, h3') {
  const { setActiveHeadingId, toc } = useAppStore()

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(headingSelector))
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is currently intersecting
        const visibleHeadings = entries.filter(entry => entry.isIntersecting)
        if (visibleHeadings.length > 0) {
          // Sort by top position to get the one closest to top
          const topHeading = visibleHeadings.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          setActiveHeadingId(topHeading.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    )

    headings.forEach(heading => observer.observe(heading))

    return () => {
      headings.forEach(heading => observer.unobserve(heading))
    }
  }, [toc, headingSelector, setActiveHeadingId])
}
