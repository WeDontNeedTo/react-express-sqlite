import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/modules/");
  };
  return (
    <nav>
      <div
        className="nav-wrapper blue darken-1 "
        style={{ padding: "0 2 rem" }}
      >
        <a href="/" className="brand-logo">
          Сокращение ссылок
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
