import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import { useCountryNames } from '@/hooks/useCountryNames';
import classes from '@/components/nav/country-details-nav/CountryDetailsNav.module.scss';

interface CountryDetailsProps {
  flag: string;
  altSpelling: string;
}

export default function CountryDetailsNav({ flag, altSpelling }: CountryDetailsProps) {
  const { countryNames } = useCountryNames();

  const navigate = useNavigate();

  function goToCountryDetails(country: string) {
    if (country !== undefined) {
      navigate(`/country/${country}`);
    }
  }

  return (
    <header className='container'>
      <nav className={classes.nav}>
        <div className={classes.country}>
          <img src={flag} alt='country flag' className={classes.navFlag} />
          <p className={classes.countryName}>{`${altSpelling} Trip`}</p>
        </div>
      </nav>
      <div className={classes.searchInputWrapper}>
        <SearchInput
          suggestions={countryNames}
          placeholder={'Search country'}
          callback={goToCountryDetails}
        />
      </div>
    </header>
  );
}
