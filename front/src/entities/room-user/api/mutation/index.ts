import { mutation } from '@/shared/api';
import { RoomUserJoin, type RoomUserJoinMutation, type RoomUserJoinMutationVariables } from './join-room.generated';
import { RoomUserLeave, type RoomUserLeaveMutationVariables, type RoomUserLeaveMutation } from './leave-room.generated';

export async function roomUserJoin(variables: RoomUserJoinMutationVariables) {
  return mutation<RoomUserJoinMutation>(RoomUserJoin, variables);
}

export async function roomUserLeave(variables: RoomUserLeaveMutationVariables) {
  return mutation<RoomUserLeaveMutation>(RoomUserLeave, variables);
}
