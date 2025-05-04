import {
    FORMAT_TEXT_COMMAND,
  } from 'lexical';
  import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
  
  export function LexicalToolbar() {
    const [editor] = useLexicalComposerContext();
  
    const format = (type) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
    };
  
    return (
      <div className="toolbar">
        <button onClick={() => format('bold')}>Bold</button>
        <button onClick={() => format('italic')}>Italic</button>
        <button onClick={() => format('underline')}>Underline</button>
      </div>
    );
  }
  