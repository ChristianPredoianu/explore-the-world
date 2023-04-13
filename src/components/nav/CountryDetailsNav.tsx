import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/inputs/SearchInput';
import { useCountryNames } from '@/hooks/useCountryNames';
import classes from '@/components/nav/CountryDetailsNav.module.scss';

interface CountryDetailsProps {
  flag: string;
  altSpelling: string;
}

export default function CountryDetailsNav({ flag, altSpelling }: CountryDetailsProps) {
  const { countryNames } = useCountryNames();

  const navigate = useNavigate();

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
