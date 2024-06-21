/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomCreateEventSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type RoomCreateEventSubscription = { roomCreateEvent: { id: string, title: string, created_at: any } };


export const RoomCreateEvent = gql`
    subscription RoomCreateEvent {
  roomCreateEvent {
    id
    title
    created_at
  }
}
    `;