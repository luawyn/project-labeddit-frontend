import React from "react";
import logo from "../../assets/logo.png";
import "../LoginPage/loginPage.sass";

const LoginPage = () => {
  return (
    <div className="margin">
      <div className="container" id="logo">
        <img src={logo} alt="" />
        <h1>LabEddit</h1>
        <p>O projeto de rede social da Labenu</p>
      </div>
      <div className="container" id="input">
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="Senha" />
      </div>
      <div className="container" id="buttons">
        <a href="" className="btn-login">
          Continuar
        </a>
        <div className="divider"></div>
        <a href="" className="btn-signup">
          Crie uma conta!
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
