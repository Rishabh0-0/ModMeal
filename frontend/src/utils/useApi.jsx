import React, { useEffect, useState } from "react";
import axios from "axios";

const useApi = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(url);
        setData(res.data.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.log("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error };
};

export default useApi;
