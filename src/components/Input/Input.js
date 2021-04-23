import React, { useState } from "react";
import { Visibility } from "@material-ui/icons";
import "./Input.css";

function Input({ Icon, value, onChange, placeholder, type }) {
    const [newType, setNewType] = useState(type);

    const changePasswordType = () => {
        if (newType === "password") {
            setNewType("text");
        }
        if (newType === "text") {
            setNewType("password");
        }
    };

    console.log(newType);

    return (
        <div className="input">
            <Icon fontSize="small" />
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={newType}
            />
            {type === "password" && (
                <Visibility
                    fontSize="small"
                    className="input__visibilityIcon"
                    onClick={changePasswordType}
                />
            )}
        </div>
    );
}

export default Input;
