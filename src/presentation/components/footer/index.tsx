import React from "react";
import Styles from "./footer-styles.scss";

const FooterComponent = () => {
    return (
        <footer className={Styles.footer}></footer>
    )
}

export const Footer = React.memo(FooterComponent);
