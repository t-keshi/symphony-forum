/* eslint-disable camelcase */
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY } from '../../entities/query';

type Data = google.maps.places.AutocompleteResponse;
type UseSearchMap = (
  inputAddress: string,
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useSearchMap: UseSearchMap = (inputAddress, options) => {
  const autocompleteService =
    new window.google.maps.places.AutocompleteService();
  const queryFn = () =>
    autocompleteService.getPlacePredictions({
      input: inputAddress,
    });

  return useQuery([QUERY.map, inputAddress], queryFn, {
    enabled: Boolean(inputAddress),
    ...options,
  });
};
