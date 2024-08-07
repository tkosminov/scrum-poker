/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  title: Types.Scalars['String']['input'];
}>;


export type TaskUpdateMutation = { taskUpdate: { id: string, room_id: string, title: string, voting_status_id: Types.EVotingStatusId, closest_point: number | null, avg_point: number | null, counts_point: any | null } };


export const TaskUpdate = gql`
    mutation TaskUpdate($id: ID!, $title: String!) {
  taskUpdate(data: {id: $id, title: $title}) {
    id
    room_id
    title
    voting_status_id
    closest_point
    avg_point
    counts_point
  }
}
    `;