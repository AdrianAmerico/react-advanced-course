import React from "react";
import Styles from "./login-styles.scss";
import {
  Footer,
  Input,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import { FormContext } from "@/presentation/context";
import { Validation } from "@/presentation/protocols";
import { Authentication } from "@/domain/usecases";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login = ({ validation, authentication }: Props) => {
  const [state, setState] = React.useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    }));
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      await authentication.auth({
        email: state.email,
        password: state.password,
      });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
            className={Styles.submit}
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
