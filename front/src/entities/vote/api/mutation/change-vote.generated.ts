/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type VoteChangeMutationVariables = Types.Exact<{
  task_id: Types.Scalars['ID']['input'];
  point: Types.Scalars['Int']['input'];
}>;


export type VoteChangeMutation = { voteChange: { room_user_id: string } };


export const VoteChange = gql`
    mutation VoteChange($task_id: ID!, $point: Int!) {
  voteChange(data: {task_id: $task_id, point: $point}) {
    room_user_id
  }
}
    `;