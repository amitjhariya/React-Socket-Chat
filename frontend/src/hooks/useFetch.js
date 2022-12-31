import { useState, useEffect } from "react";
const cache = {};

function useFetch(url,initial) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    const fetchData = async () => {
      // await new Promise(resolve => setTimeout(resolve, 10000));
      console.log("next")
      if (cache[url]) {
        const data = cache[url];
        console.log(`Cached Data ${data}`)
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
          console.log("Test20",error)
          setLoading(false);
          setError("An error occurred. Awkward..");
        }
      }
    };

    fetchData()
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
