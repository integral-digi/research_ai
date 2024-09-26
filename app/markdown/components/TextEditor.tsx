"use client";
import React, { useState, useRef, useEffect } from "react";
import { editor } from "monaco-editor";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useDarkMode } from "@/context/DarkModeContext";

const TextEditor = () => {
  const [markDown, setMarkDown] = useState<string>("");  
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);  
  const monaco = useMonaco();
  const { darkMode } = useDarkMode();

  // Set the editor reference after it's mounted
  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
  };

  // Function to get the current value in the editor
  const handleEditorChange = (value: string | undefined) => {
    setMarkDown(value || "");
  };

  // Define and apply editor themes based on the current mode (dark/light)
  useEffect(() => {
    if (monaco) {
      // Define the dark theme
      monaco.editor.defineTheme("vs-dark-custom", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "008800", fontStyle: "italic" },
          { token: "string", foreground: "A31515" },
          { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        ],
        colors: {
          "editor.background": "#262626",
        },
      });

      // Define the light theme
      monaco.editor.defineTheme("vs-light-custom", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "008800", fontStyle: "italic" },
          { token: "string", foreground: "A31515" },
          { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        ],
        colors: {
          "editor.background": "#FFFFFF",
        },
      });

      // Apply the appropriate theme based on darkMode
      monaco.editor.setTheme(darkMode ? "vs-dark-custom" : "vs-light-custom");
    }
  }, [monaco, darkMode]); 

  return (
    <div className="w-full h-full py-4">
      <Editor
        height="100vh"
        language="markdown" 
        value={markDown}
        theme={darkMode ? "vs-dark-custom" : "vs-light-custom"}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          wordWrap: "on",
          automaticLayout: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
