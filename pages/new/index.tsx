import React, { useState } from "react";
import { toast } from "react-toastify"
import { useRouter } from "next/router";
import NavBar from "../../components/navbar/navbar.component";
import NotSupported from "../../components/not_supported/not_supported";
import CustomInput from "../../components/custom_input/custom_input.component";
import Notification from "../../components/notifications_alert/notification_alert.component"
import dynamic from "next/dynamic";
import Select from "react-select";
import CustomButton from "../../components/custom_button/custom_button.component";
import Head from "next/head";
import LANGUAGES from "../../utils/languages";
import THEMES from "../../utils/themes";
import axios from "axios";
const CodeEditor = dynamic(import("../../components/code_editor/code_editor.component"), { ssr: false })

const NewSnap: React.FC = () => {


    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState({ value: undefined, label: undefined });
    const [code, setCode] = useState("");
    const [theme, setTheme] = useState({ value: undefined, label: undefined });
    const [editPass, setEditPass] = useState("");

    const router = useRouter();

    //errors
    const [usernameError, setUsernameError] = useState(false);
    const [editPassError, setEditPassError] = useState(false);

    const isAllFieldsFilled = () => {
        return !!username && !!language.value && !!language.label && !!code && !!editPass && !!theme.label && !!theme.value;
    }

    const formHandler = (e: any) => {
        e.preventDefault();
        if (isAllFieldsFilled()) {
            toast.info("Please wait while we save your snap", {
                autoClose: 20000
            });

            axios.post(`${process.env.DOMAIN}/api/snap`, {
                username: username,
                language_label: language.label,
                language: language.value,
                theme_label: theme.label,
                theme: theme.value,
                code: code,
                edit_pass: editPass
            })
                .then((res: any) => {
                    router.push(`/snap/${res.data.ops[0].username}/${res.data.ops[0]._id}`, undefined, { shallow: true })
                })
                .catch((err: any) => {
                    console.log(err);
                })
        }
        else {
            toast.error("Please fill in all the fields")

            setEditPassError(!editPass);
            setUsernameError(!username)
        }
    }

    return (
        <div className="p-3">
            <Notification />
            <Head>
                <title>Kodesnaps | New Snap</title>
            </Head>
            <NavBar />
            <div className="p-10 hidden lg:block">
                <form>
                    <div className="flex">
                        <CustomInput
                            value={username}
                            placeholder="Author Name"
                            isError={usernameError}
                            onchange={(e: any) => { setUsername(e.target.value) }}
                        />
                        <Select
                            className={`font-display w-40 h-0 m-4`}
                            options={LANGUAGES}
                            isSearchable={true}
                            onChange={setLanguage}
                            placeholder="Language"
                        />
                        <Select
                            className={`font-display w-40 h-0 m-4`}
                            options={THEMES}
                            isSearchable={true}
                            onChange={setTheme}
                            placeholder="Theme"
                        />
                        <div className="ml-auto">
                            <CustomInput
                                value={editPass}
                                width="32"
                                placeholder="Edit pass"
                                isError={editPassError}
                                otherProps="mr-0"
                                onchange={(e: any) => { setEditPass(e.target.value) }}
                            />
                        </div>
                    </div>
                    <CodeEditor
                        language={language.value}
                        onchange={(e: any) => { setCode(e) }}
                        theme={theme.value}
                        value={code}
                    />
                    <CustomButton value="Save" onclick={formHandler} otherProps="float-right w-24 h-9" />
                </form>
            </div>
            <NotSupported />
        </div>
    );

}

export default NewSnap;