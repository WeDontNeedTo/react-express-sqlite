import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        console.log(body);
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Error");
        }
        setLoading(false);
        return result;
      } catch (e) {
        console.log("error catch", e.message);
        setLoading(false);
        setError(e.message);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
