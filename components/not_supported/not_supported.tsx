import React from "react";

const NotSupported: React.FC = () => {
    return (
        <div className="block lg:hidden mt-10 text-center mb-10">
            <img src="/ice_cream.svg" className="mx-auto mb-10" />
            <div className="text-center font-display">
                <div className="font-medium">
                    Support for Phones/Tablets are on the way.
                </div>
                <div className="font-bold text-lg">
                    Try Desktop Version.
                </div>
            </div>
        </div>
    )
}

export default NotSupported;