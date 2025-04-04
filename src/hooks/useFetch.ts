import { useState, useEffect } from 'react';

export function useFetch<T>(initialUrl: string, settings?: {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setError(null);
    setIsLoading(true);
    if (!initialUrl) return;

    try {
      const response = await fetch(initialUrl, settings);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [initialUrl]);

  return [data, error, isLoading] as const;
}
