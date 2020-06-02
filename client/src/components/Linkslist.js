import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

export const Linkslist = ({ links }) => {
  console.log(links);
  if (_.isEmpty(links)) {
    return <p className="center">Ссылок пока нет</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {links.row.map((link, index) => {
          return (
            <tr key={link.linkID}>
              <td>{index + 1}</td>
              <td>{link.linkfrom}</td>
              <td>{link.linkto}</td>
              <td>
                <Link to={`/detail/${link.linkID}`}>Открыть</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
