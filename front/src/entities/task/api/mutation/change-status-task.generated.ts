/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskChangeStatusMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  voting_status_id: Types.EVotingStatusId;
}>;


export type TaskChangeStatusMutation = { taskChangeStatus: { id: string, room_id: string, voting_status_id: Types.EVotingStatusId } };


export const TaskChangeStatus = gql`
    mutation TaskChangeStatus($id: ID!, $voting_status_id: EVotingStatusId!) {
  taskChangeStatus(data: {id: $id, voting_status_id: $voting_status_id}) {
    id
    room_id
    voting_status_id
  }
}
    `;