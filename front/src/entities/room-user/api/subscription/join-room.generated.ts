/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUserJoinEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type RoomUserJoinEventSubscription = { roomUserJoinEvent: { id: string, connected: boolean, user: { id: string, name: string } } };


export const RoomUserJoinEvent = gql`
    subscription RoomUserJoinEvent($channel_id: ID!) {
  roomUserJoinEvent(channel_id: $channel_id) {
    id
    connected
    user {
      id
      name
    }
  }
}
    `;