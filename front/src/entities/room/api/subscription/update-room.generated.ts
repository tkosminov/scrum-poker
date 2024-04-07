/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUpdateEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type RoomUpdateEventSubscription = { roomUpdateEvent: { id: string, title: string | null, created_at: any } };


export const RoomUpdateEvent = gql`
    subscription RoomUpdateEvent($channel_id: ID) {
  roomUpdateEvent(channel_id: $channel_id) {
    id
    title
    created_at
  }
}
    `;