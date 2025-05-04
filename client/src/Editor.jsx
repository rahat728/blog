import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

const theme = {}; // Your theme config (can be empty)

const initialConfig = {
  namespace: 'MyEditor',
  theme,
  onError: (error) => {
    console.error('Lexical error:', error);
  },
  editorState: null, // ✅ safer than passing empty string
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor" />}
        placeholder={<div className="placeholder">Start typing...</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={(editorState) => {
        // Optional: handle change
        
      }} />
    </LexicalComposer>
  );
}
