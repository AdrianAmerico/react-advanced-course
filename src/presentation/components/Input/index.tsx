import React from "react";
import Styles from "./input-styles.scss";
import { FormContext } from "@/presentation/context";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props) => {
    const { errorState } = React.useContext(FormContext);
    const error = errorState[props.name];

    const enableInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    }

    const getStatus = (): string => {
        return error ? "🔴" : "🟢";
    }

    const getTitle = (): string => {
        return error ? error : "";
    }

    return (
        <div className={Styles.inputWrap}>
            <input {...props} readOnly onFocus={enableInput} />
            <span
                data-testid={`${props.name}-status`}
                title={getTitle()}
                className={Styles.status}
            >{getStatus()}</span>
        </div>
    )
}
