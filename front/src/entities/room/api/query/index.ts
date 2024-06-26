import { query } from '@/shared/api';

import { Rooms, type RoomsQuery, type RoomsQueryVariables } from './rooms.generated';
import { CurrentRoom, type CurrentRoomQuery, type CurrentRoomQueryVariables } from './current-room.generated';

export function rooms(variables: RoomsQueryVariables) {
  return query<RoomsQuery>(Rooms, variables);
}

export function currentRoom(variables: CurrentRoomQueryVariables) {
  return query<CurrentRoomQuery>(CurrentRoom, variables);
}
