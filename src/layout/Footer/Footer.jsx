import React from "react";
import "./footer.sass";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import mail from "../../assets/mail.svg";

const Footer = () => {
  return (
    <div className="container">
      <div className="footer">
        <div className="links-media">
          <li>
            <a
              href="https://github.com/luawyn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="github" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/luawyn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin" />
            </a>
          </li>
          <li>
            <a
              href="mailto:luanaftrevizani@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mail} alt="mail" />
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Footer;
