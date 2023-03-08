interface IUseApi<T> {
  data: null | T;
}

export async function getApiData<T>(url: string) {
  try {
    const response = await fetch(url);
    const data: IUseApi<T> = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
