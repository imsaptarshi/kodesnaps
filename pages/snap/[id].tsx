import React, { useState } from "react";
import { toast } from "react-toastify"
import { useRouter } from "next/router";
import NavBar from "../../components/navbar/navbar.component";
import CustomInput from "../../components/custom_input/custom_input.component";
import Notification from "../../components/notifications_alert/notification_alert.component"
import dynamic from "next/dynamic";
import Select from "react-select";
import CustomButton from "../../components/custom_button/custom_button.component";
import Head from "next/head";
import LANGUAGES from "../../utils/languages";
import THEMES from "../../utils/themes";
import axios from "axios";
import { cursorTo } from "readline";
import { createBuilderStatusReporter } from "typescript";
const CodeEditor = dynamic(import("../../components/code_editor/code_editor.component"), { ssr: false })

const NewSnap: React.FC = () => {

    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState({ value: undefined, label: undefined });
    const [theme, setTheme] = useState({ value: undefined, label: undefined });
    const [code, setCode] = useState("");
    const [editPass, setEditPass] = useState("");

    const [isEditVisible, setIsEditVisible] = useState(false);

    const [currUser, setCurrUser] = useState({ editPass: "" })

    const router = useRouter();
    const { id } = router.query

    axios.get(`${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/api/snap/${id}`)
        .then((res) => {

            setUsername(res.data.username)

            setLanguage({
                value: res.data.language,
                label: res.data.language_label
            })

            setTheme({
                value: res.data.theme,
                label: res.data.theme_label
            })

            setEditPass(res.data.edit_pass)

            setCode(res.data.code)
        })
        .catch((err: any) => {
            console.log(err)
        })

    //errors
    const [editPassError, setEditPassErrorError] = useState(false);

    const EditButton = () => {
        return (
            <button
                className="custom-button w-10 ml-auto hover:shadow-xl rounded-full font-display h-10 m-3"
                onClick={() => { setIsEditVisible(true) }}
            >
                <img className="mx-auto" src="/pencil.svg" />
            </button>
        )
    }


    const isAllFieldsFilled = () => {
        return !!username && !!language.value && !!language.label && !!code && !!editPass;
    }

    const formHandler = (e: any) => {
        e.preventDefault();
        if (isAllFieldsFilled()) {
            toast.info("Please wait while we save your snap", {
                autoClose: 20000
            });

            axios.post(`${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/api/snap`, {
                username: username,
                language_label: language.label,
                language: language.value,
                code: code,
                edit_pass: editPass
            })
                .then((res: any) => {
                    console.log(res);
                    router.push("/", undefined, { shallow: true })
                })
                .catch((err: any) => {
                    console.log(err);
                })
        }
        else {
            toast.error("Please fill in all the fields")

            setEditPassErrorError(!editPass);

        }
    }

    return (
        <div className="p-3">
            <Notification />
            <Head>
                <title>Kodesnaps | New Snap</title>
            </Head>
            <NavBar />
            <div className="p-10">
                <form>
                    <div className="flex">
                        <CustomInput
                            value={username}
                            placeholder="Author Name"
                            onchange={(e: any) => { setUsername(e.target.value) }}
                            disabled={true}
                        />
                        <Select
                            value={language}
                            className={`font-display w-40 h-0 m-4`}
                            placeholder="Language"
                        />
                        <Select
                            value={theme}
                            className={`font-display w-40 h-0 m-4`}
                            placeholder="Theme"
                        />
                        {isEditVisible
                            ? (<div className="ml-auto">
                                <CustomInput
                                    value={currUser.editPass}
                                    width="32"
                                    placeholder="Edit pass"
                                    isError={editPassError}
                                    otherProps="mr-0"
                                    onchange={(e: any) => { setCurrUser({ editPass: e.target.value }) }}
                                />
                            </div>)
                            : <EditButton />
                        }
                    </div>
                    <CodeEditor
                        language={language.value}
                        onchange={(e: any) => { setCode(e) }}
                        theme={theme.value}
                        value={code}
                        readonly={true}
                    />
                </form>
            </div>

        </div>
    );

}

export default NewSnap;