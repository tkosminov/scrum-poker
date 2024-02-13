import { mutation } from '@/shared/api';
import { UserUpdate, UserUpdateMutation, UserUpdateMutationVariables } from './update-user.generated';

export async function userUpdate(variables: UserUpdateMutationVariables) {
  return mutation<UserUpdateMutation>(UserUpdate, variables);
}
