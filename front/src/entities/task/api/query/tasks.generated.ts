/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TasksQueryVariables = Types.Exact<{
  room_id: Types.Scalars['ID']['input'];
}>;


export type TasksQuery = { tasks: Array<{ id: string, room_id: string, title: string, voting_status_id: Types.EVotingStatusId, closest_point: number | null, avg_point: number | null, counts_point: any | null }> };


export const Tasks = gql`
    query Tasks($room_id: ID!) {
  tasks(WHERE: {room_id: {EQ: $room_id}}, ORDER: {created_at: {SORT: DESC}}) {
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