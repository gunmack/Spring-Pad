import Paragraph from "@editorjs/paragraph";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
import Title from "title-editorjs";
// Add more tools as needed
// import Embed from "@editorjs/embed";
import TextStyleTool from "@skchawala/editorjs-text-style";

export const editorTools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: "Enter note content...",
    },
  },
  //   header: {
  //     class: Header,
  //     inlineToolbar: true,
  //     config: {
  //       placeholder: "Enter header...",
  //     },
  //   },
  //   list: {
  //     class: List,
  //     inlineToolbar: true,
  //     config: {
  //       placeholder: "Enter list item...",
  //     },
  //   },
  title: {
    class: Title,
    inlineToolbar: true,
    config: {
      placeholder: "Enter note title...",
    },
  },
  // Example: embed tool
  // embed: {
  //   class: Embed,
  //   inlineToolbar: false,
  // },
  textStyle: {
    class: TextStyleTool,
    config: {
      fontSizeEnabled: true,
      fontFamilyEnabled: true,
      fontSizes: [
        { label: "12px", value: "12px" },
        { label: "14px", value: "14px" },
        { label: "16px", value: "16px" },
        { label: "18px", value: "18px" },
        { label: "20px", value: "20px" },
      ],
      fontFamilies: [
        { label: "Arial", value: "Arial" },
        { label: "Georgia", value: "Georgia" },
        { label: "Courier New", value: "Courier New" },
        { label: "Verdana", value: "Verdana" },
      ],
      defaultFontSize: "20px",
      defaultFontFamily: "Verdana",
    },
  },
};
