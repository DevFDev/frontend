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
import { Highlight } from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { FontSize } from 'tiptap-extension-font-size'

import { Button } from '@/components/common/button'
import { Box, Container } from '@/components/common/containers'
import { Dropdown } from '@/components/common/dropdown'

const DEFAULT_EDITOR_CONTET = '<h2>내용을 입력해주세요.</h2>'
const FONT_SIZE_SM = '14pt'
const FONT_SIZE_MD = '16pt'
const FONT_SIZE_LG = '18pt'
const FONT_SIZE_XL = '20pt'

export const TipTapEditor = (): JSX.Element | null => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
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
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        >
          <IcTextHeading1 width={24} height={24} />
        </Button>
        <Button
          variant='text'
          size={'xs'}
          className='hover:bg-gray-300'
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        >
          <IcTextHeading1 width={24} height={24} />
        </Button>
      </div>
      <EditorContent editor={editor} className='tiptap-editor' />
    </Box>
  )
}
