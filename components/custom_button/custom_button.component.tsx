import React from "react";

interface props {
    value: string,
    onclick: any,
    otherProps?: string
}

const CustomButton: React.FC<props> = ({ value, onclick, otherProps }) => {
    return (
        <button
            className={`custom-button w-16 hover:shadow-xl rounded-lg font-display h-8 m-3 ${otherProps ? otherProps : ""}`}
            onClick={onclick}
        >
            {value}
        </button>
    )
}

export default CustomButton;