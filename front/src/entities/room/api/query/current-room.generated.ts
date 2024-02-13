/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type CurrentRoomQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CurrentRoomQuery = { rooms: Array<{ id: string, title: string | null, current_task_id: string | null, room_users: Array<{ id: string, user: { id: string, name: string } }> | null, tasks: Array<{ id: string, title: string, voting_status_id: Types.EVotingStatusId, point: number | null, avg_point: number | null }> | null }> };


export const CurrentRoom = gql`
    query CurrentRoom($id: ID!) {
  rooms(WHERE: {id: {EQ: $id}}) {
    id
    title
    current_task_id
    room_users {
      id
      user {
        id
        name
      }
    }
    tasks(ORDER: {created_at: {SORT: DESC}}) {
      id
      title
      voting_status_id
      point
      avg_point
    }
  }
}
    `;