interface IUseApi<T> {
  data: null | T;
}

export async function getApiData<T>(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw { message: 'Failed to get data', status: 500 };
  }

  const data: IUseApi<T> = await response.json();
  return data;
}
