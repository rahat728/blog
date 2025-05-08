import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $insertNodes, $parseSerializedNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

// Editor config
const editorConfig = {
  namespace: "PostViewer",
  editable: false,
  theme: {},
  nodes: [],
  onError(error) {
    console.error("Lexical error:", error);
  },
};

// LoadContentPlugin definition
function LoadContentPlugin({ content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!content) return;
    editor.update(() => {
      try {
        const parsed = typeof content === "string" ? JSON.parse(content) : content;
        const root = $getRoot();
        root.clear(); // clear previous content
        $insertNodes(parsed.root.children.map(child => $parseSerializedNode(child)));
      } catch (err) {
        console.error("Failed to load editor state:", err);
      }
    });
  }, [editor, content]);

  return null;
}

export default function PostContentRenderer({ content }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="prose prose-lg max-w-none">
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[1em]" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LoadContentPlugin content={content} />
      </div>
    </LexicalComposer>
  );
}
