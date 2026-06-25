import React, { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Check, Copy, TerminalSquare, AlertTriangle, Info, Lightbulb,
  AlertOctagon, BookOpen, Clock, Star, Zap,
  Monitor, Layers, Server, Network, Shield, HardDrive,
  Users, FileText, Settings, Cpu, Lock, Archive, Package,
  Wifi, Key, ScrollText, Code2, Terminal, ChevronDown, ChevronUp
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'

/* ─── Animation Variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
}

/* ─── Scroll-Reveal Wrapper ─── */
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Chapter Icon Mapping ─── */
const chapterIcons: Record<string, React.ElementType> = {
  'operating': Monitor, 'linux-introduction': Terminal, 'linux-architecture': Layers,
  'virtualization': Server, 'prompt': Terminal, 'basic-linux': Code2,
  'file-creation': FileText, 'vim': Code2, 'file-read': ScrollText,
  'directory': HardDrive, 'user-and-group': Users, 'file-permissions': Shield,
  'sudo': Lock, 'job-scheduling': Clock, 'archive': Archive,
  'package': Package, 'disk': HardDrive, 'networking': Network,
  'osi': Layers, 'ip-addressing': Wifi, 'network-configuration': Settings,
  'firewall': Shield, 'ssh': Key, 'log': ScrollText,
  'process': Cpu, 'text-processing': FileText, 'shell-scripting': Terminal,
}

function getChapterIcon(text: string): React.ElementType {
  const lower = text.toLowerCase()
  for (const [key, icon] of Object.entries(chapterIcons)) {
    if (lower.includes(key)) return icon
  }
  return BookOpen
}

function getDifficulty(chapterNum: number): { label: string; stars: number; color: string } {
  if (chapterNum <= 5) return { label: 'Beginner', stars: 1, color: 'text-emerald-400' }
  if (chapterNum <= 15) return { label: 'Intermediate', stars: 2, color: 'text-amber-400' }
  return { label: 'Advanced', stars: 3, color: 'text-red-400' }
}



/* ─── Premium Code Block ─── */
const CodeBlock = ({ className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const codeString = String(children).replace(/\n$/, '')
  const lineCount = codeString.split('\n').length
  const isLong = lineCount > 15

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const isBash = language === 'bash' || language === 'sh'

  if (!match) {
    // Inline code
    return (
      <code className="
        relative bg-primary/[0.08] dark:bg-primary/[0.12] text-primary
        px-1.5 py-0.5 rounded-md text-[13px] font-mono font-medium
        before:content-none after:content-none
        border border-primary/10
      " {...props}>
        {children}
      </code>
    )
  }

  return (
    <Reveal>
      <div className="
        relative group my-8 rounded-xl overflow-hidden
        border border-border/50 dark:border-white/[0.06]
        bg-[#1a1b26] dark:bg-[#0d0d11]
        shadow-lg shadow-black/5 dark:shadow-black/30
        hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10
        transition-shadow duration-500
      ">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
              {isBash ? <TerminalSquare className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
              <span className="uppercase tracking-wider">{language || 'code'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isLong && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center gap-1 h-6 px-2 rounded-md text-[10px] text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
              >
                {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                {collapsed ? 'Expand' : 'Collapse'}
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="
                flex items-center gap-1.5 h-6 px-2 rounded-md text-[10px]
                text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200
              "
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Code content */}
        <div className={`${collapsed ? 'max-h-[100px] overflow-hidden' : ''} relative`}>
          <SyntaxHighlighter
            style={oneDark as any}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              background: 'transparent',
              fontSize: '13px',
              lineHeight: '1.7',
            }}
            showLineNumbers={lineCount > 3}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: 'rgba(255,255,255,0.15)',
              userSelect: 'none',
            }}
            wrapLongLines={true}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
          {collapsed && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1b26] dark:from-[#0d0d11] to-transparent" />
          )}
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Premium Callout Cards ─── */
const Callout = ({ children }: { children: React.ReactNode }) => {
  const text = React.Children.toArray(children).join('')

  let Icon = Info
  let bgClass = 'bg-muted/50 dark:bg-muted/30 border-muted-foreground/20'
  let iconBg = 'bg-muted-foreground/10'
  let iconColor = 'text-muted-foreground'
  let title = 'Note'
  let accentColor = 'from-muted-foreground/30'

  if (text.includes('💡 Tip') || text.includes('Tip:')) {
    Icon = Lightbulb
    bgClass = 'bg-blue-500/[0.04] dark:bg-blue-500/[0.06] border-blue-500/20'
    iconBg = 'bg-blue-500/10'
    iconColor = 'text-blue-500'
    title = 'Tip'
    accentColor = 'from-blue-500/40'
  } else if (text.includes('⚠ Warning') || text.includes('Warning:')) {
    Icon = AlertTriangle
    bgClass = 'bg-amber-500/[0.04] dark:bg-amber-500/[0.06] border-amber-500/20'
    iconBg = 'bg-amber-500/10'
    iconColor = 'text-amber-500'
    title = 'Warning'
    accentColor = 'from-amber-500/40'
  } else if (text.includes('🚨 Danger') || text.includes('Danger:')) {
    Icon = AlertOctagon
    bgClass = 'bg-red-500/[0.04] dark:bg-red-500/[0.06] border-red-500/20'
    iconBg = 'bg-red-500/10'
    iconColor = 'text-red-500'
    title = 'Danger'
    accentColor = 'from-red-500/40'
  } else if (text.includes('📝 Note') || text.includes('Note:')) {
    Icon = Info
    bgClass = 'bg-primary/[0.03] dark:bg-primary/[0.05] border-primary/20'
    iconBg = 'bg-primary/10'
    iconColor = 'text-primary'
    title = 'Note'
    accentColor = 'from-primary/40'
  }

  const cleanContent = React.Children.map(children, child => {
    if (typeof child === 'string') {
      return child.replace(/^(💡 Tip|⚠ Warning|🚨 Danger|📝 Note|ℹ Info|Tip:|Warning:|Danger:|Note:|Info:)\s*/i, '')
    }
    return child
  })

  return (
    <Reveal>
      <div className={`
        relative my-8 rounded-xl border overflow-hidden ${bgClass}
        transition-all duration-300 hover:shadow-md
      `}>
        {/* Accent gradient bar */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${accentColor} to-transparent`} />

        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-bold uppercase tracking-wider ${iconColor} mb-1.5`}>
                {title}
              </div>
              <div className="text-sm text-foreground/80 leading-relaxed [&>p]:m-0">
                {cleanContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Chapter Hero Card ─── */
function ChapterHero({ text, id }: { text: string; id?: string }) {
  const chapterMatch = text.match(/Chapter\s+(\d+):\s*(.+)/i)
  if (!chapterMatch) return null

  const chapterNum = parseInt(chapterMatch[1])
  const chapterTitle = chapterMatch[2]
  const Icon = getChapterIcon(text)
  const difficulty = getDifficulty(chapterNum)

  return (
    <Reveal>
      <div className="
        relative my-14 rounded-2xl overflow-hidden
        border border-border/50 dark:border-white/[0.06]
        bg-gradient-to-br from-card via-card to-primary/[0.02]
        dark:from-card dark:via-card dark:to-primary/[0.04]
        shadow-xl shadow-primary/[0.04] dark:shadow-primary/[0.08]
      " id={id}>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-cyan-500/[0.03] blur-3xl" />

        <div className="relative p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Chapter badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5"
              >
                <Zap className="w-3 h-3" />
                Chapter {chapterNum}
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1]">
                {chapterTitle}
              </h2>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~10 min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < difficulty.stars ? difficulty.color + ' fill-current' : 'text-muted-foreground/20'}`} />
                  ))}
                  <span className={`text-xs font-medium ${difficulty.color}`}>{difficulty.label}</span>
                </div>
              </div>
            </div>

            {/* Icon illustration */}
            <div className="
              flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl
              bg-gradient-to-br from-primary/10 to-primary/5
              flex items-center justify-center
              border border-primary/10
            ">
              <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}


/* ─── Markdown Components ─── */
const components: Record<string, React.FC<any>> = {
  code: CodeBlock,

  blockquote: ({ children }: any) => <Callout>{children}</Callout>,

  h1: ({ children, id, ...props }: any) => (
    <Reveal>
      <h1 id={id} className="
        scroll-m-24 text-4xl lg:text-5xl font-black tracking-tight
        mb-8 mt-16 first:mt-0
        bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent
      " {...props}>
        {children}
      </h1>
    </Reveal>
  ),

  h2: ({ children, id, ...props }: any) => {
    // Extract plain text from deeply nested children (rehype-autolink-headings wraps in <a>)
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (typeof node === 'number') return String(node)
      if (Array.isArray(node)) return node.map(extractText).join('')
      if (node?.props?.children) return extractText(node.props.children)
      return ''
    }
    const text = extractText(children)
    const isChapter = /chapter\s+\d+/i.test(text)

    if (isChapter) {
      return <ChapterHero text={text} id={id} />
    }

    return (
      <Reveal>
        <h2 id={id} className="
          scroll-m-20 text-2xl lg:text-3xl font-bold tracking-tight
          mt-16 mb-6 first:mt-0
          text-foreground
        " {...props}>
          <span className="relative inline-block">
            {children}
            <span className="absolute -bottom-1.5 left-0 w-12 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary/30" />
          </span>
        </h2>
      </Reveal>
    )
  },

  h3: ({ children, id, ...props }: any) => (
    <h3 id={id} className="
      scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight
      mt-12 mb-4 text-foreground/90
      flex items-center gap-2.5
    " {...props}>
      <span className="w-1.5 h-6 rounded-full bg-primary/40 flex-shrink-0" />
      {children}
    </h3>
  ),

  h4: ({ children, id, ...props }: any) => (
    <h4 id={id} className="
      scroll-m-20 text-lg font-semibold tracking-tight
      mt-10 mb-3 text-foreground/80
    " {...props}>
      {children}
    </h4>
  ),

  p: ({ children, ...props }: any) => (
    <p className="
      leading-[1.8] text-[15px] text-muted-foreground
      [&:not(:first-child)]:mt-5 max-w-none
    " {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }: any) => (
    <ul className="my-6 ml-2 space-y-2.5 list-none" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="my-6 ml-2 space-y-2.5 list-none counter-reset-[item]" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ordered, ...props }: any) => (
    <li
      className="
        relative pl-6 text-[15px] text-muted-foreground leading-relaxed
        before:absolute before:left-0 before:top-[10px]
        before:w-1.5 before:h-1.5 before:rounded-full
        before:bg-primary/40
        hover:text-foreground transition-colors duration-200
      "
      {...props}
    >
      {children}
    </li>
  ),

  table: ({ children, ...props }: any) => (
    <div className="
      my-8 w-full overflow-x-auto rounded-xl
      border border-border/50 dark:border-white/[0.06]
      shadow-sm
    ">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted/40 dark:bg-muted/20" {...props}>{children}</thead>
  ),

  tr: ({ children, ...props }: any) => (
    <tr className="border-b border-border/30 last:border-0 transition-colors duration-200 hover:bg-muted/20" {...props}>{children}</tr>
  ),

  th: ({ children, ...props }: any) => (
    <th className="
      px-5 py-3.5 font-semibold text-[13px] text-foreground/80
      uppercase tracking-wider border-b border-border/50
    " {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td className="
      px-5 py-3.5 text-[14px] text-muted-foreground
      border-b border-border/20 last:border-0
    " {...props}>
      {children}
    </td>
  ),

  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="
        font-medium text-primary underline decoration-primary/30 underline-offset-[3px]
        hover:decoration-primary transition-all duration-200
        hover:text-primary/80
      "
      {...props}
    >
      {children}
    </a>
  ),

  hr: () => (
    <div className="my-12 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  ),

  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>{children}</strong>
  ),

  em: ({ children, ...props }: any) => (
    <em className="italic text-foreground/70" {...props}>{children}</em>
  ),

  img: ({ src, alt, ...props }: any) => (
    <Reveal>
      <figure className="my-8 rounded-xl overflow-hidden border border-border/50 shadow-lg">
        <img src={src} alt={alt} className="w-full" loading="lazy" {...props} />
        {alt && <figcaption className="text-center text-xs text-muted-foreground py-3 bg-muted/30">{alt}</figcaption>}
      </figure>
    </Reveal>
  ),
}

/* ─── Main Renderer ─── */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body pb-32">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
