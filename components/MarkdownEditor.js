import dynamic from 'next/dynamic'
import '@mdxeditor/editor/style.css'

const MDXEditor = dynamic(
  () =>
    import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  { ssr: false }
)

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin
} from '@mdxeditor/editor'

export default function MarkdownEditor({ value, onChange }) {
  return (
    <MDXEditor
      markdown={value}
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
    />
  )
}
