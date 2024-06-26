import { mutation } from '@/shared/api';
import { UserUpdate, type UserUpdateMutation, type UserUpdateMutationVariables } from './update-user.generated';

export async function userUpdate(variables: UserUpdateMutationVariables) {
  return mutation<UserUpdateMutation>(UserUpdate, variables);
}
