import { useEffect, useRef } from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something...',
      })
    }
  }, [])

  return <div ref={editorRef} style={{ height: '300px' }} />
}
