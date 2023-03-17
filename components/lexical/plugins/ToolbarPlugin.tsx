import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
} from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import {
  BiUndo,
  BiRedo,
  BiBold,
  BiStrikethrough,
  BiItalic,
  BiLinkAlt,
  BiUnderline,
  BiAlignJustify,
  BiAlignLeft,
  BiAlignRight,
  BiAlignMiddle,
  BiListUl,
  BiListOl,
  BiText
} from "react-icons/bi";
import { RiH1, RiH2, RiDoubleQuotesR } from "react-icons/ri";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

const blockTypeToBlockName = {
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

function Divider() {
  return <div className="divider" />;
}

function positionEditorElement(editor:any, rect:any) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }:{ editor:any }) {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<any>(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection?.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      let rect;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }:any) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}





function getSelectedNode(selection:any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}


const BlockOptions = ({ editor, blockType } : { editor:any, blockType:any }) =>{

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
  
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
   
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const blockOptions = [
    {
      blockType: "paragraph",
      name: "Normal",
      icon: BiText,
      handler: formatParagraph,
    },
    {
      blockType: "h1",
      name: "Large Heading",
      icon: RiH1,
      handler: formatLargeHeading,
    },
    {
      blockType: "h2",
      name: "Small Heading",
      icon: RiH2,
      handler: formatSmallHeading,
    },
    {
      blockType: "ul",
      name: "Bullet List",
      icon: BiListUl,
      handler: formatBulletList,
    },
    {
      blockType: "ol",
      name: "Numbered List",
      icon: BiListOl,
      handler: formatNumberedList,
    },
    { blockType: "quote", name: "Quote", icon: RiDoubleQuotesR, handler: formatQuote },
  ];


  const BlockIcon = blockOptions.find(o => o.blockType === blockType)?.icon as React.ElementType
  const BlockName = blockOptions.find(o => o.blockType === blockType)?.name.split(" ")[0]

  return (
    <Dropdown className="-translate-y-[107%]" label={BlockName} btnType="rect" variant="ghost" icon={ <BlockIcon/> } btnClassName="!font-normal" >
      {blockOptions.map((option) => (
        <Button
          key={option.blockType}
          onClick={option.handler}
          variant="ghost"
          btnType="rect"
          className={`w-full justify-start px-4 space-x-3 ${blockType === option.blockType ? "!text-emerald-500 !bg-emerald-100" : ""}`}
        >
          <option.icon className="text-xl" />
          <span className="font-normal text-sm">{option.name}</span>
        </Button>
      ))}
    </Dropdown>
  );
}


export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [alignType, setAlignType] = useState("Left Align");
  const [selectedElementKey, setSelectedElementKey] = useState<null | string>(null);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);

        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        setBlockType(type === "list" ? element.getTag() : type);

      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const undoRedoItems = [
    {
      label: "Undo",
      icon: BiUndo,
      disabled: !canUndo,
      handler: () => editor.dispatchCommand(UNDO_COMMAND, undefined),
    },
    {
      label: "Redo",
      icon: BiRedo,
      disabled: !canRedo,
      handler: () => editor.dispatchCommand(REDO_COMMAND, undefined),
    },
  ];

  const formatTextItems = [
    {
      label: "Format Bold",
      icon: BiBold,
      isActive: isBold,
      handler: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold"),
    },
    {
      label: "Format Italics",
      icon: BiItalic,
      isActive: isItalic,
      handler: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"),
    },
    {
      label: "Format Underline",
      icon: BiUnderline,
      isActive: isUnderline,
      handler: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"),
    },
    {
      label: "Format Strikethrough",
      icon: BiStrikethrough,
      isActive: isStrikethrough,
      handler: () =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"),
    },
    {
      label: "Format Link",
      icon: BiLinkAlt,
      isActive: isLink,
      handler: insertLink,
    },
  ];
 
  
  const formatAlignItems = [
    {
      label: "Left Align",
      icon: BiAlignLeft,
      handler: () => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
        setAlignType("Left Align")
      },
    },
     {
      label: "Center Align",
      icon: BiAlignMiddle,
      handler: () => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
        setAlignType("Center Align")
      },
    },
    {
      label: "Right Align",
      icon: BiAlignRight,
      handler: () => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
        setAlignType("Right Align")
      },
    },
    {
      label: "Justify Align",
      icon: BiAlignJustify,
      handler: () => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        setAlignType("Justify Align")
      },
    },
  ];
  const AlignIcon = formatAlignItems?.find(o => o.label === alignType)?.icon as React.ElementType
 

  return (
    <div className="toolbar" ref={toolbarRef}>
      {undoRedoItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          btnType="icon"
          disabled={item.disabled}
          onClick={item.handler}
          label={item.label}
        >
          <item.icon />
        </Button>
      ))}

      <Divider />

      {supportedBlockTypes.has(blockType) ? (
        <BlockOptions editor={editor} blockType={blockType} />
      ) : null}

      <Divider />

      {formatTextItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          btnType="icon"
          className={item.isActive ? "!text-emerald-500 !bg-emerald-100" : ""}
          onClick={item.handler}
          label={item.label}
        >
          <item.icon />
        </Button>
      ))}

      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}

      <Divider />

      <Dropdown className="-translate-y-[105%]" label="Align Text" btnType="icon" icon={ <AlignIcon/> } variant="ghost" >
       {formatAlignItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          btnType="icon"
          className={item.label === alignType ? "!text-emerald-500 !bg-emerald-100" : ""}
          onClick={item.handler}
          label={item.label}
        >
          <item.icon/>
        </Button>
      ))}
       </Dropdown>


      <Divider />
     
    </div>
  );
}
 