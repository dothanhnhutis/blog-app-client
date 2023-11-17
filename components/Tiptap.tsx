import { EditorContent, Editor } from "@tiptap/react";
import ToolBar from "./ToolBar1";

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="p-4 border rounded-lg">
      <ToolBar editor={editor} />
      <EditorContent
        spellCheck={false}
        editor={editor}
        className="p-4 border rounded-lg w-full min-h-[300px] max-h-[650px] overflow-y-scroll focus-visible:outline-0 focus-visible:ring-transparent"
      />
    </div>
  );
};
export default Tiptap;
