import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { handleApiError } from '../../../utility/handleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';

type Data = unknown;
type UseLogIn = (
  options?: UseMutationOptions<Data, Error, void>,
) => UseMutationResult<Data, Error, void>;

export const useLogOut: UseLogIn = (options) => {
  const { history } = useRouter();

  return useMutation(() => firebase.auth().signOut(), {
    onSuccess: () => history.push(ROUTE_PATHS.ログイン),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};