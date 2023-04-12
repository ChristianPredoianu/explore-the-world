import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/inputs/SearchCountryInput';
import { useFetch } from '@/hooks/useFetch';
import { ICountryName } from '@/types/apiTypes.interface';
import classes from '@/components/nav/CountryDetailsNav.module.scss';

interface CountryDetailsProps {
  flag: string;
  altSpelling: string;
}

export default function CountryDetailsNav({ flag, altSpelling }: CountryDetailsProps) {
  const allCountriesUrl = 'https://restcountries.com/v3.1/all';

  const [countryData] = useFetch<ICountryName[]>(allCountriesUrl);

  const navigate = useNavigate();

  let countryNames: string[] = [];

  if (countryData) {
    countryNames = countryData.map((countryName) => countryName.name.common);
  }

  function goToCountryDetails(country: string) {
    navigate(`/country/${country}`);
  }

  return (
    <header className='container'>
      <nav className={classes.nav}>
        <div className={classes.country}>
          <img src={flag} alt='country flag' className={classes.navFlag} />
          <p className={classes.countryName}>{`${altSpelling} Trip`}</p>
        </div>
        <SearchInput suggestions={countryNames} callback={goToCountryDetails} />
      </nav>
    </header>
  );
}
