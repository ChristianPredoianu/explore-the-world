import { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import { suggestionsReducer, IInitialState } from '@/reducers/suggestionsReducer';
import classes from '@/components/inputs/search-input/SearchInput.module.scss';
import '@/components/inputs/CurrencyFlags.scss';
import useDebounce from '@/hooks/useDebounce';

const initialState: IInitialState = {
  count: 0,
  filteredSuggestions: [],
};

export const useSearchInput = (
  suggestions: string[],
  callback: (param: string) => void
) => {
  const [state, dispatch] = useReducer(suggestionsReducer, initialState);
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const selectedSuggestionRef = useRef<HTMLUListElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const resetSuggestions = useCallback(() => {
    dispatch({ type: 'RESET_SUGGESTIONS' });
    setError('');
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setSearchQuery(value);

      if (value === '') {
        setIsShowSuggestions(false);
        resetSuggestions();
      } else {
        setIsShowSuggestions(true);
      }
    },
    [resetSuggestions]
  );

  const handleSuggestionClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const suggestion = e.currentTarget.textContent;
      if (!suggestion) return;

      resetSuggestions();
      setIsShowSuggestions(false);
      setSearchQuery(suggestion);
      callback(suggestion);
      setSearchQuery('');
    },
    [callback, resetSuggestions]
  );

  const setActiveSuggestionIntoView = useCallback(() => {
    const selectedSuggestion = selectedSuggestionRef.current?.querySelector(
      `.${classes.activeSuggestion}`
    );

    selectedSuggestion?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() === '') return;

    resetSuggestions();
    setIsShowSuggestions(false);

    if (state.filteredSuggestions[state.count] !== undefined) {
      setSearchQuery(state.filteredSuggestions[state.count]);
    } else {
      setError('No results found');
    }

    callback(state.filteredSuggestions[state.count]);
    setSearchQuery('');
  }, [searchQuery, state.count, state.filteredSuggestions, callback, resetSuggestions]);

  const handleArrowUp = useCallback(() => {
    if (state.count > 0) {
      dispatch({ type: 'PREVIOUS_ACTIVE_SUGGESTION', payload: 1 });
    }
  }, [state.count]);

  const handleArrowDown = useCallback(() => {
    if (state.count < state.filteredSuggestions.length - 1) {
      dispatch({ type: 'NEXT_ACTIVE_SUGGESTION', payload: 1 });
    }
  }, [state.count, state.filteredSuggestions.length]);

  const handleTabNavigation = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab' && isShowSuggestions) {
        e.preventDefault();
        e.shiftKey ? handleArrowUp() : handleArrowDown();
      }
    },
    [isShowSuggestions, handleArrowUp, handleArrowDown]
  );

  useEffect(() => {
    setActiveSuggestionIntoView();
  }, [state.count, setActiveSuggestionIntoView]);

  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      dispatch({
        type: 'FILTER_SUGGESTIONS',
        payload: { suggestions, searchQuery: debouncedSearchQuery },
      });
    } else {
      resetSuggestions();
      setIsShowSuggestions(false);
    }
  }, [debouncedSearchQuery, suggestions, resetSuggestions]);

  return {
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
  };
};
