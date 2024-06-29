/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VotesGetEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type VotesGetEventSubscription = { votesGetEvent: Array<{ task_id: string, point: number, room_user: { id: string, user_id: string } }> };


export const VotesGetEvent = gql`
    subscription VotesGetEvent($channel_id: ID!) {
  votesGetEvent(channel_id: $channel_id) {
    room_user {
      id
      user_id
    }
    task_id
    point
  }
}
    `;