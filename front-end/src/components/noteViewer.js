"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { editorTools } from "@/utils/EditorJSTools";

export function EditorJSViewer({ block, readOnly = true }) {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!block?.n_data?.blocks || !editorRef.current) return;
    if (!editorRef.current) return;
    if (instanceRef.current) return;

    // Initialize Editor.js
    const editor = new EditorJS({
      holder: editorRef.current,
      readOnly,
      data: block.n_data,
      autofocus: false,
      tools: editorTools,
    });

    instanceRef.current = editor;

    return () => {
      if (instanceRef.current?.destroy) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [block, readOnly]);
  console.log("Rendering EditorJSViewer with block:", block);

  return <div ref={editorRef} className=" border-gray-500 rounded-md" />;
}
