import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { linkfrom: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/detail/${data.link.linkID}`);
      } catch (err) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};
