import React, { useState } from "react";
import NavBar from "../../components/navbar/navbar.component";
import CustomInput from "../../components/custom_input/custom_input.component";
import dynamic from "next/dynamic";
import Select from "react-select";
const CodeEditor = dynamic(import("../../components/code_editor/code_editor.component"), { ssr: false })

const NewSnap: React.FC = () => {

    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState({ value: undefined, label: undefined });
    const [code, setCode] = useState("");
    const [editPass, setEditPass] = useState("");

    return (
        <div className="p-3">
            <NavBar />
            <div className="p-10">
                <form>
                    <div className="flex">
                        <CustomInput
                            value={username}
                            placeholder="Author Name"
                            isError={false}
                            onchange={(e: any) => { setUsername(e.target.value) }}
                        />
                        <Select
                            className="font-display w-40 border-gray-400 h-0 m-4"
                            options={[
                                { value: "java", label: "java" },
                                { value: "python", label: "python" }
                            ]}
                            isSearchable={true}
                            onChange={setLanguage}
                            placeholder="Language"
                        />
                        <div className="ml-auto">
                            <CustomInput
                                value={editPass}
                                width="32"
                                placeholder="Edit pass"
                                isError={false}
                                otherProps="mr-0"
                                onchange={(e: any) => { setEditPass(e.target.value) }}
                            />
                        </div>
                    </div>
                    <CodeEditor
                        language={language.value}
                        onchange={(e: any) => { setCode(e) }} />
                </form>
            </div>
        </div>
    );

}

export default NewSnap;