/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskDeleteEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type TaskDeleteEventSubscription = { taskDeleteEvent: { id: string, room_id: string } };


export const TaskDeleteEvent = gql`
    subscription TaskDeleteEvent($channel_id: ID!) {
  taskDeleteEvent(channel_id: $channel_id) {
    id
    room_id
  }
}
    `;