import { subscription } from '@/shared/api';

import {
  RoomCreateEvent,
  RoomCreateEventSubscription,
  RoomCreateEventSubscriptionVariables,
} from './create-room.generated';
import {
  RoomUpdateEvent,
  RoomUpdateEventSubscription,
  RoomUpdateEventSubscriptionVariables,
} from './update-room.generated';
import {
  RoomDeleteEvent,
  RoomDeleteEventSubscription,
  RoomDeleteEventSubscriptionVariables,
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
