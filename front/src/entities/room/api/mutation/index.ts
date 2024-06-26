import { mutation } from '@/shared/api';
import { RoomCreate, type RoomCreateMutation, type RoomCreateMutationVariables } from './create-room.generated';
import { RoomUpdate, type RoomUpdateMutation, type RoomUpdateMutationVariables } from './update-room.generated';
import { RoomDelete, type RoomDeleteMutation, type RoomDeleteMutationVariables } from './delete-room.generated';

export async function roomCreate(variables: RoomCreateMutationVariables) {
  return mutation<RoomCreateMutation>(RoomCreate, variables);
}

export async function roomUpdate(variables: RoomUpdateMutationVariables) {
  return mutation<RoomUpdateMutation>(RoomUpdate, variables);
}

export async function roomDelete(variables: RoomDeleteMutationVariables) {
  return mutation<RoomDeleteMutation>(RoomDelete, variables);
}
