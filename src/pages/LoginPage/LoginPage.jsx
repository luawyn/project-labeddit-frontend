import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../LoginPage/loginPage.sass";
import {
  Input,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import { goToHomePage, goToSignupPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setForm({ ...form, [name]: value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setErrorPassword(false);
      setErrorEmail(false);

      const body = {
        email: form.email,
        password: form.password,
      };

      const response = await axios.post(BASE_URL + "/users/login", body);
      window.localStorage.setItem("labeddit-token", response.data.token);
      console.log("response", response);

      setIsLoading(false);
      goToHomePage(navigate);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      if (error?.response?.data === "'password' incorreto") {
        setErrorPassword(true);
      }
      if (error?.response?.data === "'email' não cadastrado") {
        setErrorEmail(true);
      }
    }
  };
  return (
    <div className="container">
      <div className="flex" id="logo">
        <img src={logo} alt="" />
        <p className="title">LabEddit</p>
        <p>O projeto de rede social da Labenu</p>
      </div>
      <Flex gap="2" direction="column" align="center" id="input">
        <form onSubmit={login} autoComplete="off">
          {errorPassword ? <p className="error">senha incorreta</p> : ""}
          {errorEmail ? <p className="error">email não cadastrado</p> : ""}
          <Input
            placeholder="E-mail"
            size="lg"
            maxWidth="400px"
            name={"email"}
            value={form.email}
            onChange={onChangeForm}
          />
          <InputGroup size="lg" maxWidth="400px">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Senha"
              name={"password"}
              value={form.password}
              onChange={onChangeForm}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                color="gray.400"
              >
                {show ? "Esconder" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
      <div className="flex" id="buttons">
        <a className="btn-login" onClick={login}>
          {isLoading ? <Spinner /> : "Continuar"}
        </a>
        <div className="divider"></div>
        <a className="btn-signup" onClick={() => goToSignupPage(navigate)}>
          Crie uma conta!
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
