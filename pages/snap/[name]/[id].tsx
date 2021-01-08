import React, { useState } from "react";
import { NextPage } from "next"
import { toast } from "react-toastify"
import { useRouter } from "next/router";
import NavBar from "../../../components/navbar/navbar.component";
import CustomInput from "../../../components/custom_input/custom_input.component";
import Notification from "../../../components/notifications_alert/notification_alert.component"
import dynamic from "next/dynamic";
import Select from "react-select";
import Head from "next/head";
import NotSupported from "../../../components/not_supported/not_supported";
import axios from "axios";
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

const Snap: NextPage<props> = ({
    username,
    language,
    theme,
    code,
    editPass
}) => {
    const router = useRouter();

    const {
        name,
        id
    } = router.query

    const [isEditVisible, setIsEditVisible] = useState(false);
    const [currUser, setCurrUser] = useState({ editPass: "" })

    //errors
    const [editPassError, setEditPassError] = useState(false);

    const EditButton = () => {
        return (
            <button
                className="custom-button focus:outline-none w-10 ml-auto hover:shadow-xl rounded-full font-display h-10 m-3"
                onClick={() => { setIsEditVisible(true) }}
            >
                <img className="mx-auto" src="/pencil.svg" />
            </button>
        )
    }


    const isAllFieldsFilled = () => {
        return !!currUser.editPass;
    }

    const formHandler = (e: any) => {
        e.preventDefault()
        if (isAllFieldsFilled()) {

            if (editPass === currUser.editPass) {
                router.push(`/edit/${currUser.editPass}/${id}`, undefined, { shallow: true })
            }
            else {
                toast.error("Edit pass doesn't match, try again ...");
            }

        }
        else {
            toast.error("Please fill in all the fields")
            setEditPassError(true)
        }
    }

    return (
        <div className="p-3">
            <Notification />
            <Head>
                <title>Kodesnaps | Snap by {name}</title>
                <meta name="description" content="Share code in the most easier way than ever" />
                <meta name="title" content={`Kodesnaps | Snap by ${name}`} />
                <meta name="image" content="/kodesnaps_logo.png" />
                <meta property="og:title" content={`Kodesnaps | Snap by ${name}`} />
                <meta property="og:description" content="Share code in the most easier way than ever" />
                <meta property="og:image" content="/kodesnaps_logo.png" />
            </Head>
            <NavBar />
            <div className="p-10 hidden lg:block">
                <form>
                    <div className="flex">
                        <CustomInput
                            value={username}
                            placeholder="Author Name"
                            onchange={() => { }}
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
                            ? (
                                <>
                                    <div className="ml-auto">
                                        <CustomInput
                                            value={currUser.editPass}
                                            width="32"
                                            placeholder="Edit pass"
                                            isError={editPassError}
                                            otherProps="mr-0"
                                            onchange={(e: any) => { setCurrUser({ editPass: e.target.value }) }}
                                        />
                                    </div>
                                    <button
                                        className="custom-button focus:outline-none w-10 hover:shadow-xl rounded-full font-display h-10 m-3"
                                        onClick={formHandler}
                                    >
                                        <img className="mx-auto" src="/triangle.svg" />
                                    </button>
                                </>)
                            : <EditButton />
                        }
                    </div>
                    <CodeEditor
                        language={language.value}
                        theme={theme.value}
                        value={code}
                        readonly={true}
                        onchange={() => { }}
                    />
                </form>
            </div>
            <NotSupported />
        </div>
    );

}

Snap.getInitialProps = async (req: any) => {
    const id = req.query.id
    const res = await axios.get(`${process.env.DOMAIN}/api/snap/${id}`)
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

export default Snap;