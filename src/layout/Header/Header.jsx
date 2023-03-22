import React from "react";
import "../Header/header.sass";
import logo from "../../assets/logo.png";
import x from "../../assets/x.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const logout = () => {
    window.localStorage.removeItem("labeddit-token");
    goToLoginPage(navigate);
  };

  const renderHeader = () => {
    switch (location.pathname) {
      case "/":
        return (
          <div className="container">
            <div className="grid">
              <img src={logo} alt="" id="img-logo" />
              <a id="link" className="grid-link" onClick={logout}>
                Sair
              </a>
            </div>
          </div>
        );
      case "/signup":
        return (
          <div className="container">
            <div className="grid">
              <img
                src={logo}
                alt=""
                id="img-logo"
                onClick={() => goToHomePage(navigate)}
              />
              <a
                id="link"
                className="grid-link"
                onClick={() => goToLoginPage(navigate)}
              >
                Entrar
              </a>
            </div>
          </div>
        );
      case `/posts/comment/${params.postId}`:
        return (
          <div className="container">
            <div className="grid">
              <div>
                <img
                  src={x}
                  alt="img-x"
                  id="img-x"
                  onClick={() => goToHomePage(navigate)}
                />
              </div>
              <img
                src={logo}
                alt=""
                id="img-logo"
                onClick={() => goToHomePage(navigate)}
              />
              <a id="link" className="grid-link" onClick={() => logout()}>
                Sair
              </a>
            </div>
          </div>
        );
    }
  };
  return <div className="container">{renderHeader()}</div>;
};
export default Header;
