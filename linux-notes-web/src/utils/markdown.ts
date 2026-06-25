export interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

export function extractHeadings(markdown: string): TocItem[] {
  // Regex to match markdown headings (e.g., ## Chapter 1)
  // Ignoring code blocks would be more robust, but a simple regex is usually enough for well-formed notes.
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  
  const root: TocItem[] = [];
  const stack: { level: number, item: TocItem, parentArray: TocItem[] }[] = [];
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    // Create a simple slug ID matching rehype-slug output
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
      
    const item: TocItem = { id, text, level, children: [] };
    
    // Determine where to place this item based on its level
    if (stack.length === 0) {
      root.push(item);
      stack.push({ level, item, parentArray: root });
    } else {
      let last = stack[stack.length - 1];
      
      // Pop the stack until we find a parent with a lower level (e.g., H2 is level 2, H3 is level 3)
      while (stack.length > 0 && last.level >= level) {
        stack.pop();
        if (stack.length > 0) {
          last = stack[stack.length - 1];
        }
      }
      
      if (stack.length === 0) {
        root.push(item);
        stack.push({ level, item, parentArray: root });
      } else {
        last.item.children.push(item);
        stack.push({ level, item, parentArray: last.item.children });
      }
    }
  }
  
  return root;
}
