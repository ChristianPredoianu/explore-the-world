import classes from '@/components/inputs/search-input/SearchSuggestionItem.module.scss';
import classNames from 'classnames';

interface SearchSuggestionItemProps {
  suggestion: string;
  index: number;
  count: number;
  placeholder: string;
  handleSuggestionClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function SearchSuggestionItem({
  suggestion,
  count,
  placeholder,
  index,
  handleSuggestionClick,
}: SearchSuggestionItemProps) {
  return (
    <li
      className={classNames(classes.suggestionListItem, {
        [classes.activeSuggestion]: index === count,
      })}
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
  );
}
