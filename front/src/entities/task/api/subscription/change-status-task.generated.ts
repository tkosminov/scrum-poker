/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskChangeStatusEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type TaskChangeStatusEventSubscription = { taskChangeStatusEvent: { id: string, room_id: string, title: string, voting_status_id: string, closest_point: number | null, avg_point: number | null } };


export const TaskChangeStatusEvent = gql`
    subscription TaskChangeStatusEvent($channel_id: ID!) {
  taskChangeStatusEvent(channel_id: $channel_id) {
    id
    room_id
    title
    voting_status_id
    closest_point
    avg_point
  }
}
    `;