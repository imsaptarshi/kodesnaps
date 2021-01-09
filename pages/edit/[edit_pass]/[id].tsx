import React, { useState } from "react";
import { toast } from "react-toastify"
import { useRouter } from "next/router";
import NavBar from "../../../components/navbar/navbar.component";
import CustomInput from "../../../components/custom_input/custom_input.component";
import Notification from "../../../components/notifications_alert/notification_alert.component"
import dynamic from "next/dynamic";
import { NextPage } from "next";
import Select from "react-select";
import CustomButton from "../../../components/custom_button/custom_button.component";
import Head from "next/head";
import LANGUAGES from "../../../utils/languages";
import THEMES from "../../../utils/themes";
import axios from "axios";
import NotSupported from "../../../components/not_supported/not_supported";
const CodeEditor = dynamic(import("../../../components/code_editor/code_editor.component"), { ssr: false })

interface props {
    username: string,
    language: {
        value: string,
        label: string
    },
    theme: {
        value: string,
        label: string
    },
    code: string,
    editPass: string
}

const EditSnap: NextPage<props> = ({
    username,
    language,
    theme,
    code,
    editPass
}) => {

    const [currUsername, setUsername] = useState(username);
    const [currLanguage, setLanguage] = useState(language);
    const [currCode, setCode] = useState(code);
    const [currTheme, setTheme] = useState(theme);
    const [currEditPass, setEditPass] = useState(editPass);

    //errors
    const [usernameError, setUsernameError] = useState(false);
    const [editPassError, setEditPassError] = useState(false);

    const router = useRouter();

    const {
        edit_pass,
        id
    } = router.query


    const isAllFieldsFilled = () => {
        return !!currUsername && !!currLanguage.value && !!currLanguage.label && !!currCode && !!currEditPass && !!currTheme.label && !!currTheme.value;
    }

    const formHandler = (e: any) => {
        e.preventDefault();
        if (isAllFieldsFilled()) {
            toast.info("Please wait while we save your snap", {
                autoClose: 20000
            });

            axios.post(`${process.env.DOMAIN ? process.env.DOMAIN : "https://kodesnaps.vercel.app"}/api/edit/${id}`, {
                username: currUsername,
                language_label: currLanguage.label,
                language: currLanguage.value,
                theme_label: currTheme.label,
                theme: currTheme.value,
                code: currCode,
                edit_pass: currEditPass
            })
                .then((res: any) => {
                    router.push(`/snap/${currUsername}/${res.data.value._id}`, undefined, { shallow: true })
                })
                .catch((err: any) => {

                })
        }
        else {
            toast.error("Please fill in all the fields")

            setEditPassError(!currEditPass);
            setUsernameError(!currUsername)
        }
    }

    return (
        <div className="p-3">
            <Notification />
            <Head>
                <title>Kodesnaps | Edit Snap</title>
            </Head>
            <NavBar />
            {edit_pass === editPass ? (
                < div className="p-10 hidden lg:block">
                    <form>
                        <div className="flex">
                            <CustomInput
                                value={currUsername}
                                placeholder="Author Name"
                                isError={usernameError}
                                onchange={(e: any) => { setUsername(e.target.value) }}
                            />
                            <Select
                                value={currLanguage}
                                className={`font-display w-40 h-0 m-4`}
                                options={LANGUAGES}
                                isSearchable={true}
                                onChange={setLanguage}
                                placeholder="Language"
                            />
                            <Select
                                value={currTheme}
                                className={`font-display w-40 h-0 m-4`}
                                options={THEMES}
                                isSearchable={true}
                                onChange={setTheme}
                                placeholder="Theme"
                            />
                            <div className="ml-auto">
                                <CustomInput
                                    value={currEditPass}
                                    width="32"
                                    placeholder="Edit pass"
                                    isError={editPassError}
                                    otherProps="mr-0"
                                    onchange={(e: any) => { setEditPass(e.target.value) }}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <CodeEditor
                            language={currLanguage.value}
                            onchange={(e: any) => { setCode(e) }}
                            theme={currTheme.value}
                            value={currCode}
                        />
                        <CustomButton value="Save" onclick={formHandler} otherProps="float-right w-24 h-9 mr-0" />
                    </form>
                </div>) : (<></>)
            }
            <NotSupported />
        </div >
    );

}

EditSnap.getInitialProps = async (req: any) => {
    const id = req.query.id
    const res = await axios.get(`${process.env.DOMAIN ? process.env.DOMAIN : "https://kodesnaps.vercel.app"}/api/snap/${id}`)
    const json = await res.data;
    return {
        username: json.username,
        language: {
            value: json.language,
            label: json.language_label,
        },
        theme: {
            value: json.theme,
            label: json.theme_label,
        },
        code: json.code,
        editPass: json.edit_pass
    }
}

export default EditSnap;