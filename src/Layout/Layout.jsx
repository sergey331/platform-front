import React from "react";
import LayoutAuth from "./LayoutAuth";


const Layout = ({children}) => {
    return (
        <div>
            <LayoutAuth children={children} />
        </div>
    )
}

export default Layout
