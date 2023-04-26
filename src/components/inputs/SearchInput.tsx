import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useKeyPress } from '@/hooks/useKeyPress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from '@/components/inputs/SearchInput.module.scss';
import '@/components/inputs/CurrencyFlags.scss';

import { useClickOutside } from '@/hooks/useClickOutside';

interface SearchInputProps {
  suggestions: string[];
  placeholder: string;
  callback: (param: string) => void;
}

export default function SearchInput({
  suggestions,
  placeholder,
  callback,
}: SearchInputProps) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [undefinedSuggestionError, setUndefinedSuggestionError] = useState('');

  const selectedSuggestionRef = useRef<HTMLUListElement>(null);

  const location = useLocation();

  const ref = useClickOutside(onClose);

  useKeyPress(() => onSearch(), ['Enter']);
  useKeyPress(() => onArrowDown(), ['ArrowDown']);
  useKeyPress(() => onArrowUp(), ['ArrowUp']);
  useKeyPress(() => onBackspace(), ['Backspace']);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
    setActiveSuggestion(0);
    setIsShowSuggestions(true);
  }

  function setActiveSuggestionIntoView() {
    let selectedSuggestion;

    if (selectedSuggestionRef.current !== null) {
      selectedSuggestion = selectedSuggestionRef.current.querySelector(
        `.${classes.activeSuggestion}`
      );
    }

    if (selectedSuggestion) {
      selectedSuggestion?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  function handleSuggestionClick(e: React.MouseEvent<HTMLElement>) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setIsShowSuggestions(false);
    setSearchQuery(e.currentTarget.innerText);
    callback(e.currentTarget.innerText);
  }

  function onSearch() {
    if (searchQuery !== '') {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setIsShowSuggestions(false);
      if (filteredSuggestions[activeSuggestion] !== undefined) {
        setSearchQuery(filteredSuggestions[activeSuggestion]);
        setUndefinedSuggestionError('');
      } else {
        setUndefinedSuggestionError('Invalid search');
      }
      callback(filteredSuggestions[activeSuggestion]);
    }
  }

  function onClose() {
    setIsShowSuggestions(false);
  }

  function onArrowUp() {
    return activeSuggestion === 0
      ? null
      : setActiveSuggestion((prevSuggestion) => prevSuggestion - 1);
  }

  function onArrowDown() {
    return activeSuggestion - 1 === filteredSuggestions.length
      ? null
      : setActiveSuggestion((prevSuggestion) => prevSuggestion + 1);
  }

  function onBackspace() {
    setActiveSuggestion(0);
    setUndefinedSuggestionError('');
  }

  let suggestionListItems;

  suggestionListItems = filteredSuggestions.map((suggestion, index) => (
    <li
      className={classNames(classes.suggestionListItem, {
        [classes.activeSuggestion]: index === activeSuggestion,
      })}
      key={suggestion}
      onClick={handleSuggestionClick}
    >
      <div className={classes.suggestionListItemWrapper}>
        {placeholder === 'Currency' && (
          <div
            className={`currency-flag currency-flag-${suggestion.toLowerCase()}`}
          ></div>
        )}
        <span className={classes.listItemSpan}>{`${suggestion}`}</span>
      </div>
    </li>
  ));

  useEffect(() => {
    setActiveSuggestionIntoView();
  }, [activeSuggestion]);

  useEffect(() => {
    if (suggestions) {
      const newFilteredSuggestions = suggestions.filter((suggestion: string) =>
        suggestion.toUpperCase().includes(searchQuery.toUpperCase())
      );
      if (newFilteredSuggestions !== undefined)
        setFilteredSuggestions(newFilteredSuggestions);
    }

    if (searchQuery === '') {
      setFilteredSuggestions([]);
      setIsShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <>
      <div className={classes.inputWrapper}>
        <input
          value={searchQuery}
          type='text'
          placeholder={placeholder}
          className={classNames(classes.searchInput, {
            [classes.searchInputBgDark]: location.pathname !== '/',
          })}
          onChange={handleChange}
          ref={ref}
        />

        <FontAwesomeIcon
          icon={['fas', 'magnifying-glass']}
          className={classes.searchIcon}
          onClick={onSearch}
        />

        {isShowSuggestions && filteredSuggestions.length > 0 && (
          <ul className={classes.suggestionList} ref={selectedSuggestionRef}>
            {suggestionListItems}
          </ul>
        )}
        <p className={classes.error}>{undefinedSuggestionError}</p>
      </div>
    </>
  );
}
