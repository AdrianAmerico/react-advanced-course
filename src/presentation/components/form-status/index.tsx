import React from "react";
import { Spinner } from "..";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context"

export const FormStatus = () => {
    const { state, errorState } = React.useContext(FormContext);

    return (
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            {state.isLoading && <Spinner className={Styles.spinner} />}
            {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
        </div>
    )
}
