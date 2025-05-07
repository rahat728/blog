import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

const theme = {}; // Can be customized later if needed

const initialConfig = {
  namespace: 'MyEditor',
  theme,
  onError: (error) => {
    console.error('Lexical error:', error);
  },
  editorState: null,
};

export default function Editor({ onChange }) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded-md p-3 min-h-[200px] bg-white shadow-sm">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="min-h-[150px] outline-none text-gray-800 prose max-w-none"
            />
          }
          placeholder={
            <div className="text-gray-400 italic absolute pointer-events-none">
              Start typing...
            </div>
          }
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={(editorState) => {
          editorState.read(() => {
            const editorText = editorState.toJSON(); // Optional: for debugging
            onChange && onChange(JSON.stringify(editorText)); // Example: convert to JSON
          });
        }} />
      </div>
    </LexicalComposer>
  );
}
