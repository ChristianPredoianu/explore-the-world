import { useEffect } from 'react';
export function useKeyPress(callback: () => void, keys: string[]) {
  function onKeyDown(event: KeyboardEvent) {
    const wasAnyKeyPressed = keys.some((key) => event.key === key);

    if (wasAnyKeyPressed) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}
