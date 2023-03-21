import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICountryName } from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/components/inputs/SearchCountryInput.module.scss';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [inputError, setInputError] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [suggestions, setSuggestions] = useState<ICountryName[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(2);

  const suggestionListRef = useRef(null);

  const [countryData, setUrl] = useFetch<ICountryName[]>(
    `https://restcountries.com/v3.1/all`
  );

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);

    if (e.target.value === '') setIsInputError(false);
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const filteredCountries = filterCountries();
    const eightSuggestions = filteredCountries!.slice(0, 8);

    if (searchQuery === '') {
      setSuggestions([]);
      setActiveSuggestion(0);
    } else {
      setSuggestions(eightSuggestions);
      setSuggestionActive(e);
    }

    if (e.key === 'Enter' && searchQuery !== '') {
      /*  setSearchQuery(suggestions[activeSuggestion].name.common); */
      /*  searchCountry(); */
    }
  }

  function filterCountries() {
    let foundCountries;

    if (countryData) {
      foundCountries = countryData.filter((country: ICountryName) =>
        country.name.common.includes(capitalizeFirstLetterString(searchQuery!))
      );
    }

    return foundCountries;
  }

  function setSuggestionActive(e: KeyboardEvent<HTMLInputElement>) {
    /*    if (
      e.key === 'ArrowDown' &&
      searchQuery !== '' &&
      suggestions.length - 1 >= activeSuggestion
    ) {
      setActiveSuggestion((prevState) => prevState + 1);
      console.log(suggestions.length - 1 >= activeSuggestion);
      console.log(suggestions.length);
      console.log(activeSuggestion);
      console.log(suggestions[activeSuggestion].name.common);
      console.log(e.key);
    } */

    if (e.key === 'ArrowUp' && searchQuery !== '' && activeSuggestion !== 0) {
      setActiveSuggestion((count) => count - 1);
      console.log(activeSuggestion);
      console.log(e.key);
    }
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
    const countryData = await fetchCountries();

    const found = countryData.filter(
      (country: ICountryName) =>
        country.name.common === capitalizeFirstLetterString(searchQuery!)
    );
    console.log(found);

    if (found) {
      navigate(`country/${searchQuery}`);
    } else if (found === undefined) {
      setIsInputError(true);
      setInputError('Invalid country');
    }
  }

  return (
    <>
      <input
        type='text'
        placeholder='Search country'
        className={classes.searchInput}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        list='suggestion'
      />
      <FontAwesomeIcon
        icon={['fas', 'magnifying-glass']}
        className={classes.searchIcon}
        onClick={searchCountry}
      />
      {suggestions.length > 0 && (
        <ul className={classes.suggestionList} ref={suggestionListRef}>
          {suggestions.map((suggestion, index) => (
            <li
              className={classNames(classes.suggestionListItem, {
                [classes.activeSuggestion]: index === activeSuggestion,
              })}
              key={suggestion.name.common}
            >
              {suggestion.name.common}
            </li>
          ))}
        </ul>
      )}
      {isInputError && <p className={classes.inputError}>{inputError}</p>}
    </>
  );
}
