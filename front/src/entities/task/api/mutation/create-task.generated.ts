/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskCreateMutationVariables = Types.Exact<{
  room_id: Types.Scalars['ID']['input'];
  title: Types.Scalars['String']['input'];
}>;


export type TaskCreateMutation = { taskCreate: { id: string, room_id: string, title: string, voting_status_id: string, closest_point: number | null, avg_point: number | null } };


export const TaskCreate = gql`
    mutation TaskCreate($room_id: ID!, $title: String!) {
  taskCreate(data: {room_id: $room_id, title: $title}) {
    id
    room_id
    title
    voting_status_id
    closest_point
    avg_point
  }
}
    `;