export const omitJapanPrefix = (location: string): string => {
  const threeHeadCharacter = location.slice(0, 3);
  if (threeHeadCharacter === '日本、') {
    return location.slice(4);
  }

  return location;
};
