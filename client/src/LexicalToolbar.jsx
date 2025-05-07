import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

const theme = {}; // Customize later if needed

const initialConfig = {
  namespace: 'MyEditor',
  theme,
  onError: (error) => {
    console.error('Lexical error:', error);
  },
  editorState: null,
};

export default function Editor({ value, onChange }) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-gray-300 rounded-md p-4 bg-white shadow-sm min-h-[200px]">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="min-h-[160px] max-h-[400px] overflow-y-auto outline-none text-gray-800 prose max-w-none focus:outline-none"
            />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 italic select-none pointer-events-none">
              Start typing...
            </div>
          }
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const editorText = editorState.toJSON(); // You can change this to HTML/text
              onChange && onChange(JSON.stringify(editorText));
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
