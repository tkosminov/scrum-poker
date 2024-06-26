import { subscription } from '@/shared/api';

import {
  RoomUserJoinEvent,
  type RoomUserJoinEventSubscription,
  type RoomUserJoinEventSubscriptionVariables,
} from './join-room.generated';
import {
  RoomUserLeaveEvent,
  type RoomUserLeaveEventSubscription,
  type RoomUserLeaveEventSubscriptionVariables,
} from './leave-room.generated';

export function roomUserJoinEvent(variables: RoomUserJoinEventSubscriptionVariables) {
  return subscription<RoomUserJoinEventSubscription>(RoomUserJoinEvent, variables);
}

export function roomUserLeaveEvent(variables: RoomUserLeaveEventSubscriptionVariables) {
  return subscription<RoomUserLeaveEventSubscription>(RoomUserLeaveEvent, variables);
}
