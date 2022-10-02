import { useLocation } from 'react-router-dom';

export const useQueryParams = (): URLSearchParams => {
  const location = useLocation();

  return new URLSearchParams(location.search);
};
