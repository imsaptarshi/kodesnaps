import React from "react";

interface props {
    value: string,
    placeholder: string,
    isError?: boolean,
    onchange: any,
    width?: string
    otherProps?: string
    disabled?: boolean
}

const CustomInput: React.FC<props> = ({ value, placeholder, isError, onchange, width, otherProps, disabled }) => {
    return (
        <input
            className={`custom-input h-10 ${width && `w-${width}`} rounded-md p-2 m-4 font-display font-regular border-2 ml-0 ${isError ? 'border-red-500' : 'border-gray-200'} ${otherProps ? otherProps : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            disabled={disabled}
        />
    )
}

export default CustomInput;