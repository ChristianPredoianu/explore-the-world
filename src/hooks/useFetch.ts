import { useState, useEffect } from 'react';

export function useFetch<T>(initialUrl: string) {
  const [url, setUrl] = useState(initialUrl || '');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = <any>useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    if (!url) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, error, isLoading, setUrl] as const;
}
