import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      if (error) setError(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading };
}

export default useFetch;
