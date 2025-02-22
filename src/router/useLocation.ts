import { useLocation as useOriginLocation } from 'react-router-dom';

export const useLocation = () => {
  const location = useOriginLocation();

  const pieces = location.search.length > 0
    ? location.search.slice(1, location.search.length).split('&')
    : [];

  const search: Record<string, string[]> = {};

  pieces.forEach((piece) => {
    const key = piece.slice(0, piece.indexOf('='));
    search[key] = piece.slice(piece.indexOf('=') + 1, piece.length).split(',');
  });

  return {
    location,
    search,
  };
};
