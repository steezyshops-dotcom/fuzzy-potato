// import React from "react";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "react-bootstrap";

// This is a separate component just for the toolbar.
// Its only job is to display buttons and call functions from the main editor.
const MenuBar = ({ editor }) => {
  // If the editor isn't ready yet, don't show the toolbar
  if (!editor) {
    return null;
  }

  return (
    // buttons container
    <div className="border rounded-top p-2 bg-light">
      <Button
        // When clicked, run the "toggleBold" command
        onClick={() => editor.chain().focus().toggleBold().run()}
        // Use Bootstrap's "primary" (blue) variant if bold is currently active
        variant={editor.isActive("bold") ? "primary" : "outline-secondary"}
        size="sm"
        className="me-1"
      >
        Bold
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "primary" : "outline-secondary"}
        size="sm"
        className="me-1"
      >
        Italic
      </Button>

      {/* Add more buttons here*/}
    </div>
  );
};

// This is the main "dumb" component for our rich text editor.
const RichTextEditor = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, // Provides bold, italic, paragraphs, headings, etc.
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const editorContent = editor.getHTML();
    const isSame = editorContent === content;

    if (isSame) {
      return;
    }

    editor.commands.setContent(content);
  }, [content, editor]);

  return (
    <div>
      <MenuBar editor={editor} />

      {/* This is the TipTap component that renders the actual editable text area.
          It is directly linked to the 'editor' instance we created above. */}
      <EditorContent
        editor={editor}
        className="border rounded-bottom p-2"
        style={{ minHeight: "200px" }}
      />
    </div>
  );
};

export default RichTextEditor;
