import { subscription } from '@/shared/api';

import {
  RoomCreateEvent,
  type RoomCreateEventSubscription,
  type RoomCreateEventSubscriptionVariables,
} from './create-room.generated';
import {
  RoomUpdateEvent,
  type RoomUpdateEventSubscription,
  type RoomUpdateEventSubscriptionVariables,
} from './update-room.generated';
import {
  RoomDeleteEvent,
  type RoomDeleteEventSubscription,
  type RoomDeleteEventSubscriptionVariables,
} from './delete-room.generated';

export function roomCreateEvent(variables: RoomCreateEventSubscriptionVariables) {
  return subscription<RoomCreateEventSubscription>(RoomCreateEvent, variables);
}

export function roomUpdateEvent(variables: RoomUpdateEventSubscriptionVariables) {
  return subscription<RoomUpdateEventSubscription>(RoomUpdateEvent, variables);
}

export function roomDeleteEvent(variables: RoomDeleteEventSubscriptionVariables) {
  return subscription<RoomDeleteEventSubscription>(RoomDeleteEvent, variables);
}
