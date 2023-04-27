export interface IInitialState {
  count: number;
  filteredSuggestions: string[];
}

interface Increment {
  type: 'NEXT_ACTIVE_SUGGESTION';
  payload: number;
}
interface Decrement {
  type: 'PREVIOUS_ACTIVE_SUGGESTION';
  payload: number;
}
interface Reset {
  type: 'RESET_SUGGESTIONS';
}
interface Filter {
  type: 'FILTER_SUGGESTIONS';
  payload: { suggestions: string[]; searchQuery: string };
}

type SuggestionsActions = Increment | Decrement | Reset | Filter;

export function suggestionsReducer(
  state: IInitialState,
  action: SuggestionsActions
): IInitialState {
  switch (action.type) {
    case 'NEXT_ACTIVE_SUGGESTION':
      return { ...state, count: state.count + action.payload };
    case 'PREVIOUS_ACTIVE_SUGGESTION':
      return { ...state, count: state.count - action.payload };
    case 'RESET_SUGGESTIONS':
      return { count: 0, filteredSuggestions: [] };
    case 'FILTER_SUGGESTIONS':
      let newFilteredSuggestions;

      if (action.payload.suggestions) {
        newFilteredSuggestions = action.payload.suggestions.filter((suggestion: string) =>
          suggestion.toUpperCase().includes(action.payload.searchQuery.toUpperCase())
        );
        if (newFilteredSuggestions !== undefined)
          return { ...state, filteredSuggestions: newFilteredSuggestions };
      }
    default:
      return { ...state };
  }
}
