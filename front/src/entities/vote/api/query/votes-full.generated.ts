/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VotesFullQueryVariables = Types.Exact<{
  task_id: Types.Scalars['ID']['input'];
}>;


export type VotesFullQuery = { votes: Array<{ task_id: string, point: number, room_user: { id: string, user_id: string } }> };


export const VotesFull = gql`
    query VotesFull($task_id: ID!) {
  votes(WHERE: {task_id: {EQ: $task_id}}) {
    room_user {
      id
      user_id
    }
    task_id
    point
  }
}
    `;