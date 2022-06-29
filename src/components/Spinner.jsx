import React, {CSSProperties, useState} from 'react';
import {ClipLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "250px auto",
    borderColor: "red",
};

const Spinner = () => {
    let [color, setColor] = useState("#ffffff");
    return (
        <div>
            <ClipLoader color={color} loading={true} cssOverride={override} size={150} />
        </div>
    );
};

export default Spinner;
