/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type CurrentRoomQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CurrentRoomQuery = { rooms: Array<{ id: string, title: string, current_task_id: string | null }> };


export const CurrentRoom = gql`
    query CurrentRoom($id: ID!) {
  rooms(WHERE: {id: {EQ: $id}}) {
    id
    title
    current_task_id
  }
}
    `;