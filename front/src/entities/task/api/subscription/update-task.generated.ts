/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskUpdateEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type TaskUpdateEventSubscription = { taskUpdateEvent: { id: string, room_id: string, title: string, voting_status_id: Types.EVotingStatusId, closest_point: number | null, avg_point: number | null, counts_point: any | null } };


export const TaskUpdateEvent = gql`
    subscription TaskUpdateEvent($channel_id: ID!) {
  taskUpdateEvent(channel_id: $channel_id) {
    id
    room_id
    title
    voting_status_id
    closest_point
    avg_point
    counts_point
  }
}
    `;