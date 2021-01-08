import React from "react"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";

interface props {
    language: string | undefined,
    onchange: any
}

const CodeEditor: React.FC<props> = ({ language, onchange }) => {

    if (language !== undefined) require(`ace-builds/src-noconflict/mode-${language}`)

    return (
        <AceEditor
            mode={language}
            theme="github"
            onChange={onchange}
            name="code_editor"
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            width="100%"
            height="350px"
        />
    )
}

export default CodeEditor