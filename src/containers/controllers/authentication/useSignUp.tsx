import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';

interface Variables {
  displayName: string;
  email: string;
  password: string;
}
type Data = firebase.auth.UserCredential;
type UseSignUp = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useSignUp: UseSignUp = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();

  return useMutation(
    async (variables: Variables) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(variables.email, variables.password);
      const { currentUser } = firebase.auth();
      if (user) {
        currentUser?.updateProfile({
          displayName: variables.displayName,
        });
      }

      return user;
    },
    {
      onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
      onError: (error: Error) =>
        handleApiError(error, '新規登録に失敗しました'),
      ...options,
    },
  );
};
