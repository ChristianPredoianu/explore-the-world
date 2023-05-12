import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import SearchInput from './SearchInput';
import { BrowserRouter } from 'react-router-dom';

describe('search input test', () => {
  it('should be empty', () => {
    const mockOnClickFunction = vi.fn();
    render(
      <BrowserRouter>
        <SearchInput
          suggestions={['romania', 'france']}
          placeholder={'Search country'}
          callback={() => {
            mockOnClickFunction;
          }}
        />
      </BrowserRouter>
    );
  });
});
