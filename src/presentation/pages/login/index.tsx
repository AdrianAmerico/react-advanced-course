import React from "react"
import Styles from "./login-styles.scss"
import { Footer, Input, FormStatus, LoginHeader } from "@/presentation/components"
import { FormContext } from "@/presentation/context"
import { Validation } from "@/presentation/protocols"

type Props = {
    validation: Validation
}

const Login = ({ validation }: Props) => {
    const [state, setState] = React.useState({
        isLoading: false,
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        mainError: ""
    })

    React.useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password)
        }))
    }, [state.email, state.password])


    return (
        <div className={Styles.login}>
            <LoginHeader />
            <FormContext.Provider value={{ state, setState }}>
                <form className={Styles.form}>
                    <h2>Login</h2>

                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />

                    <button data-testid="submit" disabled type="submit" className={Styles.submit}>Entrar</button>
                    <span className={Styles.link}>Criar conta</span>

                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div >
    )
}

export default Login
