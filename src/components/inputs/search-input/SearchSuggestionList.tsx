import { forwardRef } from 'react';
import SearchSuggestionItem from '@/components/inputs/search-input/SearchSuggestionItem';
import classes from '@/components/inputs/search-input/SearchSuggestionList.module.scss';

interface SearchSuggestionListProps {
  filteredSuggestions: string[];
  count: number;
  placeholder: string;
  handleSuggestionClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default forwardRef<HTMLUListElement, SearchSuggestionListProps>(
  function SearchSuggestionList(
    { filteredSuggestions, count, placeholder, handleSuggestionClick },
    ref
  ) {
    return (
      <ul className={classes.suggestionList} ref={ref}>
        {filteredSuggestions.map((suggestion, index) => (
          <SearchSuggestionItem
            key={suggestion}
            suggestion={suggestion}
            index={index}
            placeholder={placeholder}
            count={count}
            handleSuggestionClick={handleSuggestionClick}
          />
        ))}
      </ul>
    );
  }
);
