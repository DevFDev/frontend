'use client'

import { useEffect, useRef } from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import QuillMarkdown from 'quilljs-markdown'

const QuillEditor = (): JSX.Element => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        placeholder: 'Write something...',
        theme: 'snow',
      })
      const markdownOptions = {}
      const quillMarkdown = new QuillMarkdown(quill, markdownOptions)
    }
  }, [])

  return <div ref={editorRef} style={{ height: '300px' }} />
}

export default QuillEditor
