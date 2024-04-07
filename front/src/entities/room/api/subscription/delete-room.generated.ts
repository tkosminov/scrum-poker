/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomDeleteEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type RoomDeleteEventSubscription = { roomDeleteEvent: { id: string, title: string | null, created_at: any } };


export const RoomDeleteEvent = gql`
    subscription RoomDeleteEvent($channel_id: ID) {
  roomDeleteEvent(channel_id: $channel_id) {
    id
    title
    created_at
  }
}
    `;