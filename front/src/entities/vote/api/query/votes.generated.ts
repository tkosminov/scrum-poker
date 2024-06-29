/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VotesQueryVariables = Types.Exact<{
  task_id: Types.Scalars['ID']['input'];
}>;


export type VotesQuery = { votes: Array<{ task_id: string, room_user: { id: string, user_id: string } }> };


export const Votes = gql`
    query Votes($task_id: ID!) {
  votes(WHERE: {task_id: {EQ: $task_id}}) {
    room_user {
      id
      user_id
    }
    task_id
  }
}
    `;