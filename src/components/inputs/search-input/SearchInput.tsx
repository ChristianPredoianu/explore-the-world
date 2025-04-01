import { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyPress } from '@/hooks/useKeyPress';
import { suggestionsReducer, IInitialState } from '@/reducers/suggestionsReducer';
import SearchSuggestionList from '@/components/inputs/search-input/SearchSuggestionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from '@/components/inputs/search-input/SearchInput.module.scss';
import '@/components/inputs/CurrencyFlags.scss';
import useDebounce from '@/hooks/useDebounce';
import { useSearchInput } from '@/hooks/useSearchInput';

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
  const location = useLocation();
  const ref = useClickOutside(() => setIsShowSuggestions(false));

  const {
    state,
    isShowSuggestions,
    searchQuery,
    setSearchQuery,
    error,
    selectedSuggestionRef,
    handleChange,
    handleSuggestionClick,
    handleSearch,
    handleArrowUp,
    handleArrowDown,
    handleTabNavigation,

    resetSuggestions,
    setIsShowSuggestions,
  } = useSearchInput(suggestions, callback);

  useKeyPress(handleSearch, ['Enter']);
  useKeyPress(handleArrowDown, ['ArrowDown']);
  useKeyPress(handleArrowUp, ['ArrowUp']);
  useKeyPress(resetSuggestions, ['Backspace']);
  useKeyPress(() => {
    setIsShowSuggestions(false);
    setSearchQuery('');
  }, ['Escape']);

  return (
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
        onKeyDown={handleTabNavigation}
        ref={ref}
        aria-label={placeholder}
        aria-autocomplete='list'
        aria-activedescendant={state.filteredSuggestions[state.count] || ''}
      />
      <FontAwesomeIcon
        icon={['fas', 'magnifying-glass']}
        className={classes.searchIcon}
        onClick={handleSearch}
        aria-label='Search'
      />

      {isShowSuggestions && state.filteredSuggestions.length > 0 && (
        <div role='listbox' aria-labelledby='search-suggestions' aria-live='polite'>
          <SearchSuggestionList
            filteredSuggestions={state.filteredSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            count={state.count}
            placeholder={placeholder}
            ref={selectedSuggestionRef}
          />
        </div>
      )}

      {error && (
        <p className={classes.error} role='alert' aria-live='assertive'>
          {error}
        </p>
      )}
    </div>
  );
}
