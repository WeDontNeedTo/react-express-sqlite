import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from "../context/auth.context";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(()=>{
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log(form)
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data", data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      console.log(data)
      auth.login(data.token, data.userId)
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div></div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "15px" }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>

            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
            <div className="input-field">
              <input
                placeholder="Введите email"
                id="email"
                type="email"
                name="email"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Email</label>
            </div>
            <div className="input-field">
              <input
                id="password"
                type="password"
                placeholder="Введите пароль"
                name="password"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="last_name">Пароль</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
