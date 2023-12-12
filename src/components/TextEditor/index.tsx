"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  DraftHandleValue,
  ContentBlock,
  DraftStyleMap,
  ContentState
} from 'draft-js';
import styles from './styles.module.css';;

const TextEditor: React.FC<ITextEditor> = props => {
  const { value, onChange, isReadOnly = false, className = '' } = props;
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editor = useRef<Editor>(null);

  useEffect(() => {
    if (value) {
      if (isValidJSON(value)) {
        setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(value))));
      } else {
        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(value)));
      }
    }
  }, [value]);

  const focusEditor = () => {
    editor.current?.focus();
  };

  const _onBlur = () => {
    const contentState = editorState.getCurrentContent();
    const data = JSON.stringify(convertToRaw(contentState));
    const planText = contentState.getPlainText();

    // console.log("Plan Text : ", planText)
    onChange?.(data, planText);
  };

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // FOR INLINE STYLES
  const styleMap: DraftStyleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    },
    HIGHLIGHT: {
      backgroundColor: '#F7A5F7'
    },
    UPPERCASE: {
      textTransform: 'uppercase'
    },
    LOWERCASE: {
      textTransform: 'lowercase'
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: 'inherit',
      background: '#ffeff0',
      fontStyle: 'italic',
      lineHeight: 1.5,
      padding: '0.3rem 0.5rem',
      borderRadius: ' 0.2rem'
    },
    SUPERSCRIPT: {
      verticalAlign: 'super',
      fontSize: '80%'
    },
    SUBSCRIPT: {
      verticalAlign: 'sub',
      fontSize: '80%'
    }
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case 'blockQuote':
        return 'superFancyBlockquote';
      case 'leftAlign':
        return 'leftAlign';
      case 'rightAlign':
        return 'rightAlign';
      case 'centerAlign':
        return 'centerAlign';
      case 'justifyAlign':
        return 'justifyAlign';
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.editorWrapper }${className} `} onClick={focusEditor} onBlur={_onBlur}>
      <div className={`${styles.editorContainer}`}>
        <Editor
          ref={editor}
          readOnly={isReadOnly}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={editorState => {
            setEditorState(editorState);
          }}
        />
      </div>
    </div>
  );
};

function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

interface ITextEditor {
  value?: string | undefined;
  onChange?: (data: string, planText: string) => void;
  isReadOnly?: boolean;
  className?: string;
}

export default TextEditor;
