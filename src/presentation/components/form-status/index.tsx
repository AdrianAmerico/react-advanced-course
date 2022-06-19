import React from "react";
import { Spinner } from "..";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context"

export const FormStatus = () => {
    const { isLoading, errorMessage } = React.useContext(FormContext);

    return (
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
        </div>
    )
}
