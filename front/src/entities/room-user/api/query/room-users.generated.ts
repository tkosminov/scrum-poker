/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUsersQueryVariables = Types.Exact<{
  room_id: Types.Scalars['ID']['input'];
}>;


export type RoomUsersQuery = { roomUsers: Array<{ id: string, connected: boolean, user: { name: string } }> };


export const RoomUsers = gql`
    query RoomUsers($room_id: ID!) {
  roomUsers(WHERE: {room_id: {EQ: $room_id}, connected: {EQ: true}}) {
    id
    connected
    user {
      name
    }
  }
}
    `;