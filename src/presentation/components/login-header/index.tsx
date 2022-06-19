import React from "react";
import { Logo } from "@/presentation/components"
import Styles from "./login-header-styles.scss"

export const LoginHeaderComponent = () => {
    return (
        <header className={Styles.header}>
            <Logo />
            <h1>4Dev - Enquetes para Programadores</h1>
        </header>
    )
}

export const LoginHeader = React.memo(LoginHeaderComponent);
