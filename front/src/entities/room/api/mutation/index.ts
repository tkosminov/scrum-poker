import { mutation } from '@/shared/api';
import { RoomCreateMutation, RoomCreate, RoomCreateMutationVariables } from './create-room.generated';
import { RoomUpdateMutationVariables, RoomUpdateMutation, RoomUpdate } from './update-room.generated';
import { RoomDeleteMutationVariables, RoomDeleteMutation, RoomDelete } from './delete-room.generated';

export async function roomCreate(variables: RoomCreateMutationVariables) {
  return mutation<RoomCreateMutation>(RoomCreate, variables);
}

export async function roomUpdate(variables: RoomUpdateMutationVariables) {
  return mutation<RoomUpdateMutation>(RoomUpdate, variables);
}

export async function roomDelete(variables: RoomDeleteMutationVariables) {
  return mutation<RoomDeleteMutation>(RoomDelete, variables);
}
