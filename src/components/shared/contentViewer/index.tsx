import { ReactElement } from 'react'

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser'

interface ContentViewerProps {
  content: string
  className?: string
}

export const ContentViewer = ({
  content,
  className = '',
}: ContentViewerProps): JSX.Element => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === 'code' &&
        domNode.attribs?.class
      ) {
        const language = domNode.attribs.class.replace('language-', '')
        try {
          const highlightedCode = hljs.highlight(
            (domNode.children[0] as any)?.data || '',
            { language }
          ).value

          return (
            <code
              className={domNode.attribs.class}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) as ReactElement
        } catch (e) {
          return domNode
        }
      }
    },
  }

  return <div className={`tiptap ${className}`}>{parse(content, options)}</div>
}
