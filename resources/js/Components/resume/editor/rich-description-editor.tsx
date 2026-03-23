import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div
      className="border-border bg-muted/40 flex flex-wrap gap-0.5 border-b p-1"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Button
        type="button"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        aria-label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        aria-label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        aria-label="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        aria-label="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        aria-label="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

interface RichDescriptionEditorProps {
  /** Unique key per row so switching items remounts with correct content */
  instanceKey: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichDescriptionEditor({
  instanceKey,
  value,
  onChange,
  placeholder = "Start typing…",
  className,
}: RichDescriptionEditorProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: false,
          blockquote: false,
          codeBlock: false,
          code: false,
          horizontalRule: false,
        }),
        Placeholder.configure({ placeholder }),
      ],
      content: normalizeContent(value),
      editorProps: {
        attributes: {
          class:
            "focus:outline-none min-h-[6.5rem] max-w-none px-2.5 py-2 text-sm leading-relaxed",
        },
      },
      onUpdate: ({ editor: ed }) => {
        onChange(ed.getHTML());
      },
    },
    [instanceKey],
  );

  if (!editor) {
    return (
      <div
        className={cn(
          "border-input bg-muted/30 min-h-[7.5rem] rounded-md border",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rich-description-editor border-input bg-background overflow-hidden rounded-md border shadow-sm",
        className,
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function normalizeContent(raw: string): string {
  const t = raw?.trim() ?? "";
  if (!t) return "<p></p>";
  if (t.includes("<")) return t;
  return `<p>${escapeHtml(t).replace(/\n/g, "</p><p>")}</p>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
