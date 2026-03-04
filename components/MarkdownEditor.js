import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function MarkdownEditor({ value, onChange }) {
  const [tab, setTab] = useState('write');

  return (
    <div className="md-editor">
      <div className="md-editor__tabs">
        <button
          type="button"
          className={`md-editor__tab${tab === 'write' ? ' md-editor__tab--active' : ''}`}
          onClick={() => setTab('write')}
        >
          Escribir
        </button>
        <button
          type="button"
          className={`md-editor__tab${tab === 'preview' ? ' md-editor__tab--active' : ''}`}
          onClick={() => setTab('preview')}
        >
          Vista previa
        </button>
        <span className="md-editor__hint">Markdown + HTML permitido</span>
      </div>

      {tab === 'write' ? (
        <textarea
          className="md-editor__textarea"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Escribe en Markdown...\n\n**negrita**  _cursiva_  \`código\`\n\n\`\`\`js\nconsole.log('bloque de código')\n\`\`\`\n\n[enlace](https://...)\n\n<!-- iframe de YouTube o X -->\n<iframe src="..." ...></iframe>`}
        />
      ) : (
        <div className="md-editor__preview">
          {value ? (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="md-editor__empty">Sin contenido todavía.</p>
          )}
        </div>
      )}
    </div>
  );
}
