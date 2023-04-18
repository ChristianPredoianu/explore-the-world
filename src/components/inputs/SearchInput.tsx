import { useState, ChangeEvent, useEffect } from 'react';
import { useKeyPress } from '@/hooks/useKeyPress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from '@/components/inputs/SearchInput.module.scss';
import '@/components/inputs/CurrencyFlags.css';

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

  useKeyPress(() => onEnter(), ['Enter']);
  useKeyPress(() => onArrowDown(), ['ArrowDown']);
  useKeyPress(() => onArrowUp(), ['ArrowUp']);
  useKeyPress(() => onBackspace(), ['Backspace']);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
    setActiveSuggestion(0);
    setIsShowSuggestions(true);
  }

  function handleSuggestionClick(e: React.MouseEvent<HTMLElement>) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setIsShowSuggestions(false);
    setSearchQuery(e.currentTarget.innerText);
    callback(e.currentTarget.innerText);
  }

  function onEnter() {
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
          className={classes.searchInput}
          onChange={handleChange}
        />
        {placeholder !== 'Currency' && (
          <FontAwesomeIcon
            icon={['fas', 'magnifying-glass']}
            className={classes.searchIcon}
          />
        )}
        {isShowSuggestions && filteredSuggestions.length > 0 && (
          <ul className={classes.suggestionList}>{suggestionListItems}</ul>
        )}
        <p className={classes.error}>{undefinedSuggestionError}</p>
      </div>
    </>
  );
}