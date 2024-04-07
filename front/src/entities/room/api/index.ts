export { rooms, currentRoom } from './query';
export { type RoomsQuery, type RoomsQueryVariables } from './query/rooms.generated';
export { type CurrentRoomQuery, type CurrentRoomQueryVariables } from './query/current-room.generated';

export { roomCreate, roomUpdate, roomDelete } from './mutation';
export { type RoomCreateMutation, type RoomCreateMutationVariables } from './mutation/create-room.generated';
export { type RoomUpdateMutation, type RoomUpdateMutationVariables } from './mutation/update-room.generated';
export { type RoomDeleteMutation, type RoomDeleteMutationVariables } from './mutation/delete-room.generated';

export { roomCreateEvent, roomUpdateEvent, roomDeleteEvent } from './subscription';
export {
  type RoomCreateEventSubscription,
  type RoomCreateEventSubscriptionVariables,
} from './subscription/create-room.generated';
export {
  type RoomUpdateEventSubscription,
  type RoomUpdateEventSubscriptionVariables,
} from './subscription/update-room.generated';
export {
  type RoomDeleteEventSubscription,
  type RoomDeleteEventSubscriptionVariables,
} from './subscription/delete-room.generated';
