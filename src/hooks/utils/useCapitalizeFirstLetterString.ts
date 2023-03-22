export function useCapitalizeFirstLetterString() {
  function capitalizeFirstLetterString(str: string) {
    const capitalizedString = str
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    return capitalizedString;
  }

  return { capitalizeFirstLetterString } as const;
}
