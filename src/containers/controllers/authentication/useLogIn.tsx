import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';
import { logIn } from '../../database/authentication/log';

interface Variables {
  email: string;
  password: string;
}
type Data = unknown;
type UseLogIn = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useLogIn: UseLogIn = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();
  const mutateFn = (variables: Variables) => logIn(variables);

  return useMutation(mutateFn, {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
