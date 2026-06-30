import React, { useState, useEffect, useRef, memo, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/* ─── Helpers ─── */

const extractText = (node: any): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node?.props?.children) return extractText(node.props.children)
  return ''
}

/* ─── Markdown Components (portfolio-style, performant) ─── */

const components: Record<string, React.FC<any>> = {
  h1: ({ children, id, ...props }: any) => (
    <h1 id={id} className="scroll-m-24 text-3xl lg:text-4xl font-bold tracking-tight mb-6 mt-14 first:mt-0 text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: any) => (
    <div className="mt-14 mb-6 first:mt-0">
      <h2 id={id} className="scroll-m-20 text-2xl lg:text-3xl font-bold tracking-tight text-foreground pb-3 border-b border-border" {...props}>
        {children}
      </h2>
    </div>
  ),
  h3: ({ children, id, ...props }: any) => {
    const text = extractText(children)
    if (text.includes('DevOps Track — Linux')) return null
    return (
      <h3 id={id} className="scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight mt-10 mb-3 text-foreground/90" {...props}>
        {children}
      </h3>
    )
  },
  h4: ({ children, id, ...props }: any) => (
    <h4 id={id} className="scroll-m-20 text-lg font-semibold tracking-tight mt-8 mb-2 text-foreground/80" {...props}>
      {children}
    </h4>
  ),

  /* ─── Code Block (terminal style) ─── */
  pre: ({ children, ...props }: any) => (
    <div className="my-5 rounded-xl overflow-hidden border border-border bg-card">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-muted-foreground font-mono">terminal</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-foreground/90" {...props}>
        {children}
      </pre>
    </div>
  ),

  p: ({ children, ...props }: any) => (
    <p className="leading-7 text-[15px] text-foreground/75 my-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-4 ml-6 list-disc text-foreground/75 text-[15px] space-y-1.5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, start, ...props }: any) => {
    const items = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child)
    )

    // If it's the main TOC (large list), split into 3 cards
    if (items.length >= 15) {
      const chunks = []
      const chunkSize = Math.ceil(items.length / 3) // e.g. 9 for 27 chapters
      
      for (let i = 0; i < items.length; i += chunkSize) {
        chunks.push(items.slice(i, i + chunkSize))
      }
      
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
          {chunks.map((chunk, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
              {/* Subtle top gradient bar for portfolio feel */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80" />
              
              <h3 className="text-primary font-mono text-sm font-bold mb-5 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Part {idx + 1}
              </h3>
              
              <ol className="list-decimal ml-5 text-[13.5px] text-foreground/80 space-y-3.5 marker:text-muted-foreground marker:font-mono font-medium" start={idx * chunkSize + 1}>
                {chunk}
              </ol>
            </div>
          ))}
        </div>
      )
    }

    return (
      <ol className="my-4 ml-6 list-decimal text-foreground/75 text-[15px] space-y-1.5" start={start} {...props}>
        {children}
      </ol>
    )
  },
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="my-5 pl-4 border-l-4 border-accent/50 text-foreground/65 italic rounded-r-lg py-2 pr-4 bg-accent/5" {...props}>
      {children}
    </blockquote>
  ),

  /* ─── Table ─── */
  table: ({ children, ...props }: any) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => <thead className="bg-muted/30" {...props}>{children}</thead>,
  tr: ({ children, ...props }: any) => <tr className="border-b border-border last:border-0" {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => <th className="px-4 py-2.5 font-semibold text-[13px] text-primary uppercase tracking-wider" {...props}>{children}</th>,
  td: ({ children, ...props }: any) => <td className="px-4 py-2.5 text-[14px] text-foreground/75" {...props}>{children}</td>,

  a: ({ href, children, ...props }: any) => (
    <a href={href} className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors" {...props}>
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: ({ children, ...props }: any) => <strong className="font-semibold text-foreground" {...props}>{children}</strong>,
  em: ({ children, ...props }: any) => <em className="italic text-foreground/70" {...props}>{children}</em>,
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-6 rounded-xl overflow-hidden border border-border">
      <img src={src} alt={alt} className="w-full" loading="lazy" {...props} />
      {alt && <figcaption className="text-center text-xs text-foreground/50 py-2 bg-muted/20">{alt}</figcaption>}
    </figure>
  ),

  /* ─── Inline & Block Code ─── */
  code: ({ children, className, ...props }: any) => {
    if (!className) {
      return (
        <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[13px] font-mono border border-primary/20" {...props}>
          {children}
        </code>
      )
    }
    return <code className={`${className} block font-mono leading-relaxed bg-transparent`} {...props}>{children}</code>
  }
}

/* ─── Stable plugin refs ─── */
const remarkPlugins = [remarkGfm]
const rehypePlugins = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'wrap' }]
] as any

/* ─── Single Section Renderer (memoized) ─── */
const SectionRenderer = memo(function SectionRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  )
})

/* ─── Lazy Section: only renders when near viewport ─── */
function LazySection({ markdown, index }: { markdown: string; index: number }) {
  const [isVisible, setIsVisible] = useState(index < 2)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        root: document.getElementById('main-content'),
        rootMargin: '400px 0px',
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isVisible])

  const estimatedHeight = Math.max(200, markdown.split('\n').length * 18)

  return (
    <div ref={ref}>
      {isVisible ? (
        <SectionRenderer markdown={markdown} />
      ) : (
        <div style={{ minHeight: estimatedHeight }} className="flex items-center justify-center text-muted-foreground/30 text-sm">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

/* ─── Split markdown by H2 headings ─── */
function splitByH2(content: string): string[] {
  const lines = content.split('\n')
  const sections: string[] = []
  let current: string[] = []

  for (const line of lines) {
    if (/^## /.test(line) && current.length > 0) {
      sections.push(current.join('\n'))
      current = [line]
    } else {
      current.push(line)
    }
  }
  if (current.length > 0) {
    sections.push(current.join('\n'))
  }
  return sections
}

/* ─── Main Renderer ─── */
export function MarkdownRenderer({ content }: { content: string }) {
  const sections = useMemo(() => splitByH2(content), [content])

  return (
    <div className="markdown-body pb-32">
      {sections.map((section, i) => (
        <LazySection key={i} markdown={section} index={i} />
      ))}
    </div>
  )
}
