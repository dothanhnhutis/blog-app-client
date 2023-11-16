import { Editor } from "@tiptap/react";
import React from "react";
import {
  Heading1,
  Heading2,
  Bold,
  Italic,
  Strikethrough,
  ListOrdered,
  List,
  Undo2,
  Redo2,
} from "lucide-react";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("paragraph")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("heading", { level: 1 })
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Heading1 size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("heading", { level: 2 })
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Heading2 size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("bold")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Bold size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("italic")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Italic size={24} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("strike")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Strikethrough size={24} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("bulletList")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <List size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.isActive("orderedList")
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <ListOrdered size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.can().chain().focus().undo().run()
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Undo2 size={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={classNames(
          "p-2 rounded-full",
          editor.can().chain().focus().redo().run()
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500 "
        )}
        type="button"
      >
        <Redo2 size={24} />
      </button>
    </div>
  );
};

export default ToolBar;
