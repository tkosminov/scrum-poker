/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUserLeaveMutationVariables = Types.Exact<{
  room_id: Types.Scalars['ID']['input'];
}>;


export type RoomUserLeaveMutation = { roomUserLeave: { id: string } };


export const RoomUserLeave = gql`
    mutation RoomUserLeave($room_id: ID!) {
  roomUserLeave(data: {room_id: $room_id}) {
    id
  }
}
    `;