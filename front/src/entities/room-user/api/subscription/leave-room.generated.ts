/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUserLeaveEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type RoomUserLeaveEventSubscription = { roomUserLeaveEvent: { id: string, user_id: string } };


export const RoomUserLeaveEvent = gql`
    subscription RoomUserLeaveEvent($channel_id: ID!) {
  roomUserLeaveEvent(channel_id: $channel_id) {
    id
    user_id
  }
}
    `;