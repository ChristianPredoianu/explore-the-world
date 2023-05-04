import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import SearchInput from './SearchInput';

describe('search input test', () => {
  it('should be empty', () => {
    const mockOnClickFunction = vi.fn();
    render(
      <SearchInput
        suggestions={['romania', 'france']}
        placeholder={'Search country'}
        callback={() => {
          mockOnClickFunction;
        }}
      />
    );
  });
});
