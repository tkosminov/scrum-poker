import { query } from '@/shared/api';
import { CurrentUser, type CurrentUserQuery, type CurrentUserQueryVariables } from './current-user.generated';

export async function currentUser(variables: CurrentUserQueryVariables) {
  return query<CurrentUserQuery>(CurrentUser, variables);
}
