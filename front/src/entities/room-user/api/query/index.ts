import { query } from '@/shared/api';

import { RoomUsers, type RoomUsersQuery, type RoomUsersQueryVariables } from './room-users.generated';

export function roomUsers(variables: RoomUsersQueryVariables) {
  return query<RoomUsersQuery>(RoomUsers, variables);
}
