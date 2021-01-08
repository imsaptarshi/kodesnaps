import React from "react"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";

interface props {
    language: string | undefined,
    theme?: string
    onchange: any
    value?: string,
    readonly?: boolean
}

const CodeEditor: React.FC<props> = ({ language, theme, onchange, value, readonly }) => {

    if (language !== undefined) require(`ace-builds/src-noconflict/mode-${language}`)
    if (theme !== undefined) require(`ace-builds/src-noconflict/theme-${theme}`)

    return (
        <AceEditor
            mode={language}
            theme={theme ? theme : "github"}
            onChange={onchange}
            name="code_editor"
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            width="100%"
            height="350px"
            value={value ? value : ""}
            readOnly={readonly ? readonly : false}
        />
    )
}

export default CodeEditor