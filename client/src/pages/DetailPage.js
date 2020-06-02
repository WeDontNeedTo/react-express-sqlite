import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkID = useParams().id;
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    console.log(linkID);
    try {
      const fetched = await request(`/api/link/${linkID}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (err) {}
  }, [token, linkID, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
