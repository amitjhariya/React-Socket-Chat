import { useState, useEffect } from "react";
const cache = {};

function useFetch(url,initial) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading("loading...");
    setError(null);
    const fetchData = async () => {
      // console.log("Use FetchDat")
      // await new Promise(resolve => setTimeout(resolve, 10000));
      if (cache[url]) {
        const data = cache[url];
        setData(data);
        setLoading(false);
      } else {        
        try {
          const response = await fetch(url);
          const res = await response.json();
          cache[url] = res.data;     
          setData(res.data);
          setLoading(false);
        } catch (error) {
          // console.log(error)
          setLoading(false);
          setError(`Error In loading Groups...`);
        }
      }
    };

    fetchData()
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
