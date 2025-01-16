'use client'

import { Highlight } from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

const DEFAULT_EDITOR_CONTET = '<h2>내용을 입력해주세요.</h2>'

export const TiptapEditor = (): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  })

  return <EditorContent editor={editor} />
}
