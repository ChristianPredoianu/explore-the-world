import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useCapitalizeFirstLetterString } from '@/hooks/utils/useCapitalizeFirstLetterString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICountryName } from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/components/inputs/SearchCountryInput.module.scss';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputError, setInputError] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [suggestions, setSuggestions] = useState<ICountryName[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const [countryData, setUrl] = useFetch<ICountryName[]>(
    `https://restcountries.com/v3.1/all`
  );

  const { capitalizeFirstLetterString } = useCapitalizeFirstLetterString();

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (countryData) filterSuggestions();

    /* const filteredCountries = filterSuggestions();
    const eightSuggestions = filteredCountries!.slice(0, 8); */

    /* if (searchQuery === '') {
      setSuggestions([]);
    } */

    if (e.target.value === '') setIsInputError(false);
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && searchQuery !== '') {
      /*  setSearchQuery(suggestions[activeSuggestion].name.common); */
      /*  searchCountry(); */
    }

    if (
      e.key === 'ArrowDown' &&
      searchQuery !== '' &&
      suggestions.length >= activeSuggestion + 2
    ) {
      setActiveSuggestion((prevState) => prevState + 1);
    }

    if (e.key === 'ArrowUp' && searchQuery !== '' && activeSuggestion !== 0) {
      setActiveSuggestion((prevState) => prevState - 1);
    }

    /*   if (e.key === 'Backspace') filterSuggestions(); */
  }

  function filterSuggestions() {
    let foundCountries;

    if (suggestions && countryData) {
      foundCountries = countryData.filter((country: ICountryName) =>
        country.name.common.includes(capitalizeFirstLetterString(searchQuery!))
      );
    }

    if (foundCountries) setSuggestions(foundCountries.slice(0, 8));
  }

  async function searchCountry() {
    let found;

    if (countryData) {
      found = countryData.filter(
        (country: ICountryName) =>
          country.name.common === capitalizeFirstLetterString(searchQuery!)
      );
    }

    if (found) {
      navigate(`country/${searchQuery}`);
    } else if (found === undefined) {
      setIsInputError(true);
      setInputError('Invalid country');
    }
  }

  let suggestionListItems;

  if (suggestions.length > 0) {
    suggestionListItems = suggestions.map((suggestion, index) => (
      <li
        className={classNames(classes.suggestionListItem, {
          [classes.activeSuggestion]: index === activeSuggestion,
        })}
        key={suggestion.name.common}
      >
        {`${suggestion.name.common}`}
      </li>
    ));
  }

  useEffect(() => {
    if (searchQuery === '') {
      setSuggestions([]);
    } else {
      filterSuggestions();
    }
  }, [searchQuery]);

  return (
    <>
      <input
        value={searchQuery}
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
        <ul className={classes.suggestionList}>{suggestionListItems}</ul>
      )}

      {isInputError && <p className={classes.inputError}>{inputError}</p>}
    </>
  );
}
