/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VoteCurrentQueryVariables = Types.Exact<{
  task_id: Types.Scalars['ID']['input'];
}>;


export type VoteCurrentQuery = { voteCurrent: { point: number } | null };


export const VoteCurrent = gql`
    query VoteCurrent($task_id: ID!) {
  voteCurrent(task_id: $task_id) {
    point
  }
}
    `;