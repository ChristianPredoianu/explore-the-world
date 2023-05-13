import { useState, useEffect, useRef, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyPress } from '@/hooks/useKeyPress';
import { suggestionsReducer } from '@/reducers/suggestionsReducer';
import SearchSuggestionList from '@/components/inputs//search-input/SearchSuggestionList';
import { IInitialState } from '@/reducers/suggestionsReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from '@/components/inputs/search-input/SearchInput.module.scss';
import '@/components/inputs/CurrencyFlags.scss';

interface SearchInputProps {
  suggestions: string[];
  placeholder: string;
  callback: (param: string) => void;
}

const initialState: IInitialState = { count: 0, filteredSuggestions: [] };

export default function SearchInput({
  suggestions,
  placeholder,
  callback,
}: SearchInputProps) {
  const [state, dispatch] = useReducer(suggestionsReducer, initialState);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [undefinedSuggestionError, setUndefinedSuggestionError] = useState('');

  const selectedSuggestionRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const ref = useClickOutside(onClose);
  console.log('dsa');
  useKeyPress(() => onSearch(), ['Enter']);
  useKeyPress(() => onArrowDown(), ['ArrowDown']);
  useKeyPress(() => onArrowUp(), ['ArrowUp']);
  useKeyPress(() => onBackspace(), ['Backspace']);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
    dispatch({ type: 'RESET_SUGGESTIONS' });
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
    dispatch({ type: 'RESET_SUGGESTIONS' });
    setIsShowSuggestions(false);
    setSearchQuery(e.currentTarget.innerText);
    callback(e.currentTarget.innerText);
    setSearchQuery('');
  }

  function onSearch() {
    if (searchQuery !== '') {
      dispatch({ type: 'RESET_SUGGESTIONS' });
      setIsShowSuggestions(false);

      if (state.filteredSuggestions[state.count] !== undefined) {
        setSearchQuery(state.filteredSuggestions[state.count]);
        setUndefinedSuggestionError('');
      } else {
        setUndefinedSuggestionError('Invalid search');
      }
      callback(state.filteredSuggestions[state.count]);
      setSearchQuery('');
    }
  }

  function onClose() {
    setIsShowSuggestions(false);
  }

  function onArrowUp() {
    return state.count === 0
      ? null
      : dispatch({ type: 'PREVIOUS_ACTIVE_SUGGESTION', payload: 1 });
  }

  function onArrowDown() {
    return state.count - 1 === state.filteredSuggestions.length
      ? null
      : dispatch({ type: 'NEXT_ACTIVE_SUGGESTION', payload: 1 });
  }

  function onBackspace() {
    dispatch({ type: 'RESET_SUGGESTIONS' });
    setUndefinedSuggestionError('');
  }

  useEffect(() => {
    setActiveSuggestionIntoView();
  }, [state.count]);

  useEffect(() => {
    dispatch({ type: 'FILTER_SUGGESTIONS', payload: { suggestions, searchQuery } });

    if (searchQuery === '') {
      dispatch({ type: 'RESET_SUGGESTIONS' });
      setIsShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <>
      <div className={classes.inputWrapper}>
        <input
          value={searchQuery}
          type='text'
          name='search-countries'
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
        {isShowSuggestions && state.filteredSuggestions.length > 0 && (
          <SearchSuggestionList
            filteredSuggestions={state.filteredSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            count={state.count}
            placeholder={placeholder}
            ref={selectedSuggestionRef}
          />
        )}
        <p className={classes.error}>{undefinedSuggestionError}</p>
      </div>
    </>
  );
}
