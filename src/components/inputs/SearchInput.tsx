import { useState, ChangeEvent, useEffect } from 'react';
/* import { useNavigate } from 'react-router-dom'; */

import { useKeyPress } from '@/hooks/useKeyPress';
import { useCapitalizeFirstLetterString } from '@/hooks/utils/useCapitalizeFirstLetterString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';
import classes from '@/components/inputs/SearchInput.module.scss';

interface SearchInputProps {
  suggestions: string[];
  callback: (param: string) => void;
}

export default function SearchInput({ suggestions, callback }: SearchInputProps) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useKeyPress(() => onEnter(), ['Enter']);
  useKeyPress(() => onArrowDown(), ['ArrowDown']);
  useKeyPress(() => onArrowUp(), ['ArrowUp']);
  useKeyPress(() => onBackspace(), ['Backspace']);

  const { capitalizeFirstLetterString } = useCapitalizeFirstLetterString();

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
      setSearchQuery(filteredSuggestions[activeSuggestion]);
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
      <span className={classes.listItemSpan}>{`${suggestion}`}</span>
    </li>
  ));

  useEffect(() => {
    if (suggestions) {
      const newFilteredSuggestions = suggestions.filter((suggestion: string) =>
        suggestion.includes(capitalizeFirstLetterString(searchQuery))
      );
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
          placeholder='Search country'
          className={classes.searchInput}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={['fas', 'magnifying-glass']}
          className={classes.searchIcon}
        />
        {isShowSuggestions && (
          <ul className={classes.suggestionList}>{suggestionListItems}</ul>
        )}
      </div>
    </>
  );
}
