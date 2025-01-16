'use client'

import {
  IcTextBold,
  IcTextCenterAlign,
  IcTextCodeBlock,
  IcTextHeading,
  IcTextHeading1,
  IcTextHeading2,
  IcTextHeading3,
  IcTextHeading4,
  IcTextHeading5,
  IcTextImageUpload,
  IcTextItalic,
  IcTextLeftAlign,
  IcTextQuote,
  IcTextRightAlign,
  IcTextSize,
  IcTextStrikeThrough,
  IcTextUnderline,
} from '@/assets/IconList'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Highlight } from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import bash from 'highlight.js/lib/languages/bash'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import php from 'highlight.js/lib/languages/php'
import powershell from 'highlight.js/lib/languages/powershell'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { all, createLowlight } from 'lowlight'
import { FontSize } from 'tiptap-extension-font-size'

import { Button } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { Dropdown } from '@/components/common/dropdown'

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('json', json)

lowlight.register('python', python)
lowlight.register('java', java)
lowlight.register('ruby', ruby)
lowlight.register('php', php)
lowlight.register('go', go)
lowlight.register('csharp', csharp)

lowlight.register('sql', sql)
lowlight.register('yaml', yaml)

lowlight.register('bash', bash)
lowlight.register('shell', shell)
lowlight.register('powershell', powershell)

const DEFAULT_EDITOR_CONTET = '<h2>내용을 입력해주세요.</h2>'
const FONT_SIZE_SM = '14pt'
const FONT_SIZE_MD = '16pt'
const FONT_SIZE_LG = '18pt'
const FONT_SIZE_XL = '20pt'

export const TipTapEditor = ({
  content = DEFAULT_EDITOR_CONTET,
}: {
  content: string
}): JSX.Element | null => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      FontSize,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  })

  if (!editor) {
    return null
  }

  return (
    <Box
      variant='outlined'
      className='items-start justify-start overflow-hidden'
    >
      <div className='flex h-44 w-full items-center bg-gray-100 px-12 py-6'>
        <Dropdown className='h-34'>
          <Dropdown.Trigger>
            <div className='flex h-34 items-center justify-center rounded-8 px-5 hover:bg-gray-300'>
              <IcTextSize width={24} height={24} />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setFontSize(FONT_SIZE_SM).run()
              }
            >
              작게 (14pt)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setFontSize(FONT_SIZE_MD).run()
              }
            >
              보통 (16pt)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setFontSize(FONT_SIZE_LG).run()
              }
            >
              크게 (18pt)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setFontSize(FONT_SIZE_XL).run()
              }
            >
              아주 크게 (20pt)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='h-34'>
          <Dropdown.Trigger>
            <div className='flex h-34 items-center justify-center rounded-8 px-5 hover:bg-gray-300'>
              <IcTextHeading width={24} height={24} />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setHeading({ level: 1 }).run()
              }
            >
              <IcTextHeading1 width={24} height={24} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setHeading({ level: 2 }).run()
              }
            >
              <IcTextHeading2 width={24} height={24} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setHeading({ level: 3 }).run()
              }
            >
              <IcTextHeading3 width={24} height={24} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setHeading({ level: 4 }).run()
              }
            >
              <IcTextHeading4 width={24} height={24} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                editor.chain().focus().setHeading({ level: 5 }).run()
              }
            >
              <IcTextHeading5 width={24} height={24} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <IcTextBold width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <IcTextItalic width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <IcTextStrikeThrough width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <IcTextUnderline width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          disabled={!editor.can().chain().focus().setTextAlign('left').run()}
        >
          <IcTextLeftAlign width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          disabled={!editor.can().chain().focus().setTextAlign('center').run()}
        >
          <IcTextCenterAlign width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          disabled={!editor.can().chain().focus().setTextAlign('right').run()}
        >
          <IcTextRightAlign width={24} height={24} />
        </Button>
        <Button variant='text' size={'xs'} className='hover:bg-gray-300'>
          <IcTextImageUpload width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setBlockquote().run()}
        >
          <IcTextQuote width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setCodeBlock().run()}
        >
          <IcTextCodeBlock width={24} height={24} />
        </Button>
      </div>
      <EditorContent editor={editor} className='tiptap-editor' />
    </Box>
  )
}
