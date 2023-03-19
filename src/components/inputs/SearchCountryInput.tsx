import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICountryName } from '@/types/apiTypes.interface';
import classes from '@/components/inputs/SearchCountryInput.module.scss';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [inputError, setInputError] = useState('');
  const [isInputError, setIsInputError] = useState(false);

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);

    if (e.target.value === '') setIsInputError(false);
  }
  /* Need to fix like fetch countries and show them when user starts typing, show them below the input element like position absolute */
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') searchCountry();
  }

  async function fetchCountries() {
    const countryResponse = await fetch('https://restcountries.com/v3.1/all');
    const countryData: ICountryName[] = await countryResponse.json();

    return countryData;
  }

  function capitalizeFirstLetterString(str: string) {
    const capitalizedString = str
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    return capitalizedString;
  }

  async function searchCountry() {
    if (searchQuery !== '') {
      const countryData = await fetchCountries();

      const found = countryData.find(
        (country: ICountryName) =>
          country.name.common === capitalizeFirstLetterString(searchQuery!)
      );

      if (found) {
        navigate(`country/${searchQuery}`);
      } else if (found === undefined) {
        setIsInputError(true);
        setInputError('Invalid country');
      }
    }
  }

  return (
    <>
      <input
        type='text'
        placeholder='Search country'
        className={classes.searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        icon={['fas', 'magnifying-glass']}
        className={classes.searchIcon}
        onClick={searchCountry}
      />
      {isInputError && <p className={classes.inputError}>{inputError}</p>}
    </>
  );
}
