import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export function useScrollSpy(headingSelector: string = 'h1, h2, h3') {
  const { setActiveHeadingId, toc } = useAppStore()

  useEffect(() => {
    const mainContent = document.getElementById('main-content')
    if (!mainContent) return

    let ticking = false

    const updateActiveHeading = () => {
      const headings = Array.from(mainContent.querySelectorAll(headingSelector))
      if (headings.length === 0) return

      let activeHeading: Element | null = null

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect()
        // 150px offset to account for the top navigation bar + some padding
        if (rect.top <= 150) {
          activeHeading = heading
        } else {
          // Since headings are in DOM order, once we find one below our threshold,
          // we can stop checking the rest.
          break
        }
      }

      // If we're at the very top and no heading has crossed the threshold,
      // default to the first heading.
      if (!activeHeading && headings.length > 0) {
        activeHeading = headings[0]
      }

      if (activeHeading && activeHeading.id) {
        setActiveHeadingId(activeHeading.id)
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveHeading()
          ticking = false
        })
        ticking = true
      }
    }

    mainContent.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check on mount
    updateActiveHeading()

    // When lazy sections load and add new headings to the DOM,
    // we should re-evaluate the active heading.
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(updateActiveHeading, 100)
    })

    mutationObserver.observe(mainContent, {
      childList: true,
      subtree: true
    })

    return () => {
      mainContent.removeEventListener('scroll', handleScroll)
      mutationObserver.disconnect()
      if (debounceTimer) clearTimeout(debounceTimer)
    }
  }, [toc, headingSelector, setActiveHeadingId])
}
