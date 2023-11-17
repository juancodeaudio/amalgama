import type { MDXComponents } from 'mdx/types'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.
 
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    strong: ({ children }) => <span style={{ color: "#B9BCF3", fontWeight: "bold"}}>{children}</span>,
    h2: ({ children }) => <h2 style={{ color: "#f5f5f5" }}>{children}</h2>,
    em: ({ children }) => <em style={{ color: "#B9BCF3" }}>{children}</em>,
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
  }
}