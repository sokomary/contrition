import { useNavigate as useOriginNavigate } from 'react-router-dom';
import { ROUTES } from 'src/router';
import { useLocation } from './useLocation';

type Route = keyof typeof ROUTES;

type Search = Record<string, (string | number)[]> | string;

type NavigateParams = {
  to?: Route;
  search?: Search;
  keepPreviousSearch?: boolean;
};

export const useNavigate = () => {
  const { location } = useLocation();
  const navigate = useOriginNavigate();

  const buildSearchString = (search?: Search, keepPreviousSearch?: boolean) => {
    let result;
    if (!search) {
      return undefined;
    }

    if (typeof search === 'string') {
      result = search;
    } else {
      result = Object.keys(search)
        .filter((key) => !!search[key].length)
        .map((key) => `${key}=${search[key].join(',')}`)
        .join('&');
    }

    return keepPreviousSearch && location.search
      ? [location.search, result].join('&')
      : result;
  };

  return {
    navigate: ({ to, search, keepPreviousSearch }: NavigateParams) => {
      navigate({
        pathname: to ? ROUTES[to] : undefined,
        search: buildSearchString(!!to && !search ? '' : search, keepPreviousSearch),
      });
    },
  };
};
