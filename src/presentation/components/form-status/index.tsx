import React from "react";
import { Spinner } from "..";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context"

export const FormStatus = () => {
    const { state } = React.useContext(FormContext);

    return (
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            {state.isLoading && <Spinner className={Styles.spinner} />}
            {state.mainError && <span className={Styles.error}>{state.mainError}</span>}
        </div>
    )
}
