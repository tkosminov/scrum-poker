/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VoteChangeEventSubscriptionVariables = Types.Exact<{
  channel_id: Types.Scalars['ID']['input'];
}>;


export type VoteChangeEventSubscription = { voteChangeEvent: { task_id: string, room_user: { id: string, user_id: string } } };


export const VoteChangeEvent = gql`
    subscription VoteChangeEvent($channel_id: ID!) {
  voteChangeEvent(channel_id: $channel_id) {
    room_user {
      id
      user_id
    }
    task_id
  }
}
    `;