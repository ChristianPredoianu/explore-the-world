import { useState, ChangeEvent, useEffect } from 'react';
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
  const [isSelecting, setIsSelecting] = useState(false);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);

  const [countryData] = useFetch<ICountryName[]>(`https://restcountries.com/v3.1/all`);

  const { capitalizeFirstLetterString } = useCapitalizeFirstLetterString();

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setIsInputError(false);
    setIsSelecting(false);
    setActiveSuggestion(0);

    if (e.target.value === '') setIsInputError(false);
  }

  function filterSuggestions() {
    let foundCountries;

    if (countryData) {
      foundCountries = countryData.filter((country: ICountryName) =>
        country.name.common.includes(capitalizeFirstLetterString(searchQuery))
      );
    }

    if (foundCountries) {
      const firstEightSuggestions = foundCountries.slice(0, 8);
      setSuggestions(firstEightSuggestions);
      setIsShowSuggestions(true);
    }
  }

  function searchCountry() {
    let found: ICountryName[];

    if (countryData) {
      found = countryData.filter(
        (country: ICountryName) =>
          country.name.common === capitalizeFirstLetterString(searchQuery)
      );

      if (found.length > 0) {
        navigate(`country/${searchQuery}`);
      } else {
        setInputError('Invalid country');
        setIsInputError(true);
        setIsShowSuggestions(false);
      }
    }
  }

  function handleSuggestionClick(suggestion: string, index: number) {
    if (activeSuggestion) setActiveSuggestion(index);

    setSearchQuery(suggestion);
    navigate(`country/${suggestion}`);
  }

  function checkKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && searchQuery !== '') {
      const selectedSuggestion = suggestions[activeSuggestion].name.common;

      setIsInputError(false);
      navigate(`country/${selectedSuggestion}`);
    }

    if (e.key === 'ArrowDown' && suggestions.length >= activeSuggestion + 2) {
      setIsSelecting(true);
      setActiveSuggestion((prevState) => prevState + 1);
    }

    if (e.key === 'ArrowUp' && activeSuggestion !== 0) {
      setIsSelecting(true);
      setActiveSuggestion((prevState) => prevState - 1);
    }

    if (e.key === 'Backspace') {
      setIsSelecting(false);
      setActiveSuggestion(0);
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
        onClick={() => handleSuggestionClick(suggestion.name.common, index)}
      >
        <span className={classes.listItemSpan}>{`${suggestion.name.common}`}</span>
      </li>
    ));
  }

  useEffect(() => {
    window.addEventListener('keydown', checkKeyPress);

    return () => {
      window.removeEventListener('keydown', checkKeyPress);
    };
  }, [checkKeyPress]);

  useEffect(() => {
    if (!isSelecting) filterSuggestions();

    if (searchQuery === '') setSuggestions([]);
  }, [searchQuery]);

  useEffect(() => {
    if (countryData && isSelecting)
      setSearchQuery(suggestions[activeSuggestion].name.common);
  }, [suggestions, activeSuggestion]);

  return (
    <>
      <input
        value={searchQuery}
        type='text'
        placeholder='Search country'
        className={classes.searchInput}
        onChange={handleChange}
      />
      <FontAwesomeIcon
        icon={['fas', 'magnifying-glass']}
        className={classes.searchIcon}
        onClick={searchCountry}
      />
      {isShowSuggestions && suggestions.length > 0 && (
        <ul className={classes.suggestionList}>{suggestionListItems}</ul>
      )}

      {isInputError && <p className={classes.inputError}>{inputError}</p>}
    </>
  );
}
