import React from "react"
import Styles from "./login-styles.scss"
import { Footer, Input, FormStatus, LoginHeader } from "@/presentation/components"
import { FormContext } from "@/presentation/context"

type StateProps = {
    isLoading: boolean
    errorMessage: string
}

const Login: React.FC = () => {
    const [state, setstate] = React.useState<StateProps>({
        isLoading: false,
        errorMessage: ""
    })

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setstate }}>
                <form className={Styles.form}>
                    <h2>Login</h2>

                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />

                    <button type="submit" className={Styles.submit}>Entrar</button>
                    <span className={Styles.link}>Criar conta</span>

                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div >
    )
}

export default Login
