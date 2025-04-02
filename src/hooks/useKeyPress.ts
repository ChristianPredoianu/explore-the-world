import { useEffect } from 'react';
export function useKeyPress(callback: () => void, keys: string[]) {
  function onKeyDown(event: KeyboardEvent) {
    const isAnyKeyPressed = keys.some((key) => event.key === key);

    if (isAnyKeyPressed) callback();
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}
