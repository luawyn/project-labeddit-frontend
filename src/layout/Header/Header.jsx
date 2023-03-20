import React from "react";
import "../Header/header.sass";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className="container">
      <div className="grid">
        <img src={logo} alt="" id="img-logo" />
        <a id="link" className="grid-link">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
