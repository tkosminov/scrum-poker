/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUserJoinMutationVariables = Types.Exact<{
  room_id: Types.Scalars['ID']['input'];
}>;


export type RoomUserJoinMutation = { roomUserJoin: { id: string } };


export const RoomUserJoin = gql`
    mutation RoomUserJoin($room_id: ID!) {
  roomUserJoin(data: {room_id: $room_id}) {
    id
  }
}
    `;