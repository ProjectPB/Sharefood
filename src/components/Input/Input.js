import React, { useEffect, useState } from "react";
import { Visibility } from "@material-ui/icons";
import "./Input.css";

function Input({
    Icon,
    title,
    value,
    onChange,
    placeholder,
    type,
    pattern,
    openInfo,
}) {
    const [newType, setNewType] = useState(type);
    const [isValid, setIsValid] = useState(true);

    const changePasswordType = () => {
        if (newType === "password") {
            setNewType("text");
        }
        if (newType === "text") {
            setNewType("password");
        }
    };

    useEffect(() => {
        if (value !== "") {
            if (!value.match(pattern)) {
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        } else {
            setIsValid(true);
        }
    }, [value]);

    if (placeholder === "Confirm Password") {
        console.log(`PATTERN ${pattern}`);
    }

    return (
        <div className="input__container">
            <div
                className="input"
                style={
                    isValid
                        ? { border: "1px solid" }
                        : { border: "2px solid red", margin: "-1px" }
                }
            >
                <Icon fontSize="small" />
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={newType}
                    pattern={pattern}
                />
                {type === "password" && (
                    <Visibility
                        fontSize="small"
                        className="input__visibilityIcon"
                        onClick={changePasswordType}
                    />
                )}
            </div>
            {openInfo && (
                <p
                    style={isValid ? { color: "gray" } : { color: "red" }}
                    className="signUp__inputInfo"
                >
                    {title}
                </p>
            )}
        </div>
    );
}

export default Input;
