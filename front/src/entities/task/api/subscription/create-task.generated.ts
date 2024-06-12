/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskCreateEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type TaskCreateEventSubscription = { taskCreateEvent: { id: string, room_id: string, title: string, voting_status_id: string, closest_point: number | null, avg_point: number | null } };


export const TaskCreateEvent = gql`
    subscription TaskCreateEvent($channel_id: ID!) {
  taskCreateEvent(channel_id: $channel_id) {
    id
    room_id
    title
    voting_status_id
    closest_point
    avg_point
  }
}
    `;