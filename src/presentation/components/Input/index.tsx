import React from "react";
import Styles from "./input-styles.scss";
import { FormContext } from "@/presentation/context";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props) => {
    const { state, setState } = React.useContext(FormContext);
    const error = state[`${props.name}Error`];

    const enableInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    }

    const getStatus = (): string => {
        return error ? "🔴" : "🟢";
    }

    const getTitle = (): string => {
        return error ? error : "";
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className={Styles.inputWrap}>
            <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
            <span
                data-testid={`${props.name}-status`}
                title={getTitle()}
                className={Styles.status}
            >{getStatus()}</span>
        </div>
    )
}
