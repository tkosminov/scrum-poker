/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskSetCurrentEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type TaskSetCurrentEventSubscription = { taskSetCurrentEvent: { id: string, room_id: string } };


export const TaskSetCurrentEvent = gql`
    subscription TaskSetCurrentEvent($channel_id: ID!) {
  taskSetCurrentEvent(channel_id: $channel_id) {
    id
    room_id
  }
}
    `;