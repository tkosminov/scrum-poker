import { query } from '@/shared/api';
import { CurrentUser, CurrentUserQuery, CurrentUserQueryVariables } from './current-user.generated';

export async function currentUser(variables: CurrentUserQueryVariables) {
  return query<CurrentUserQuery>(CurrentUser, variables);
}
