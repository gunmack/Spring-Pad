"use client";
import React, { useState } from "react";

export function RenderEditorJS({ note, charLimit = 200, blockLimit = 3 }) {
  const data = note?.n_data;

  // Store checklist states
  const [checklistState, setChecklistState] = useState(() => {
    const state = {};
    if (Array.isArray(data?.blocks)) {
      data.blocks.forEach((block) => {
        if (block.type === "list" && block.data.style === "checklist") {
          state[block.id] = block.data.items.map(
            (item) => item.meta?.checked || false,
          );
        }
      });
    }
    return state;
  });

  if (!data || !Array.isArray(data.blocks)) return null;

  const toggleCheckbox = (blockId, index) => {
    setChecklistState((prev) => {
      const updated = [...prev[blockId]];
      updated[index] = !updated[index];
      return {
        ...prev,
        [blockId]: updated,
      };
    });
  };

  const headerSizes = {
    1: "text-4xl md:text-5xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
    5: "text-base md:text-lg",
    6: "text-sm md:text-base",
  };

  const titleSizes = {
    H1: "text-4xl md:text-5xl",
    H2: "text-3xl md:text-4xl",
    H3: "text-2xl md:text-3xl",
    H4: "text-xl md:text-2xl",
    H5: "text-lg md:text-xl",
    H6: "text-base md:text-lg",
  };

  // Limit the number of blocks displayed
  const blocksToRender = data.blocks.slice(0, blockLimit);

  return (
    <div className="space-y-2">
      {blocksToRender.map((block, index) => {
        const key = block.id || `block-${index}`;
        const text = block.data.text || ""; // fallback for text

        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={key}
                className="text-xs md:text-base text-gray-800"
                dangerouslySetInnerHTML={{
                  __html:
                    text.length > charLimit
                      ? text.slice(0, charLimit) + "…"
                      : text,
                }}
              />
            );

          // case "header": {
          //   const level = block.data.level || 2;
          //   const text = block.data.text || "";
          //   return React.createElement(`h${level}`, {
          //     key,
          //     className: `font-semibold text-black ${headerSizes[level] || "text-base"}`,
          //     dangerouslySetInnerHTML: {
          //       __html:
          //         text.length > charLimit
          //           ? text.slice(0, charLimit) + "…"
          //           : text,
          //     },
          //   });
          // }

          case "title": {
            const TitleTag = (block.data.titleType || "H1").toUpperCase();
            const Tag = TitleTag.toLowerCase();
            return (
              <Tag
                key={key}
                className={`font-bold text-black ${titleSizes[TitleTag] || "text-base"} ${block.data.alignText || "Text-Align-Left"}`}
                style={{ color: block.data.color || "inherit" }}
                dangerouslySetInnerHTML={{
                  __html:
                    text.length > charLimit
                      ? text.slice(0, charLimit) + "…"
                      : text,
                }}
              />
            );
          }

          // case "list": {
          //   if (block.data.style === "checklist") {
          //     return (
          //       <ul key={key} className="list-none pl-4 space-y-1">
          //         {block.data.items.map((item, i) => (
          //           <li key={i} className="flex items-center gap-2">
          //             <input
          //               type="checkbox"
          //               checked={checklistState[block.id]?.[i] || false}
          //               onChange={() => toggleCheckbox(block.id, i)}
          //               className="w-4 h-4"
          //             />
          //             <span
          //               dangerouslySetInnerHTML={{
          //                 __html:
          //                   item.content.length > charLimit
          //                     ? item.content.slice(0, charLimit) + "…"
          //                     : item.content,
          //               }}
          //             />
          //           </li>
          //         ))}
          //       </ul>
          //     );
          //   } else {
          //     const ListTag = block.data.style === "ordered" ? "ol" : "ul";
          //     return (
          //       <ListTag
          //         key={key}
          //         className={`pl-6 space-y-1 text-base ${
          //           block.data.style === "ordered"
          //             ? "list-decimal"
          //             : "list-disc"
          //         }`}
          //       >
          //         {block.data.items.map((item, i) => (
          //           <li
          //             key={i}
          //             dangerouslySetInnerHTML={{
          //               __html:
          //                 item.content.length > charLimit
          //                   ? item.content.slice(0, charLimit) + "…"
          //                   : item.content,
          //             }}
          //           />
          //         ))}
          //       </ListTag>
          //     );
          //   }
          // }

          default:
            return <div key={key}>Unknown block type: {block.type}</div>;
        }
      })}
    </div>
  );
}
