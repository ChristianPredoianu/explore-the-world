import { useFetch } from '@/hooks/useFetch';
import { baseAllCountriesUrl } from '@/utils/urls';
import { ICountryName } from '@/types/apiTypes.interface';

export function useCountryNames() {
  const [countryData] = useFetch<ICountryName[]>(baseAllCountriesUrl);

  let countryNames: string[] = [];

  if (countryData)
    countryNames = countryData.map((countryName) => countryName.name.common);

  return {
    countryNames,
  } as const;
}
