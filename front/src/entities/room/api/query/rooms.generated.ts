/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RoomsQuery = { rooms: Array<{ id: string, title: string | null, created_at: any }> };


export const Rooms = gql`
    query Rooms {
  rooms(
    ORDER: {created_at: {SORT: DESC, PRIORITY: 1}, id: {SORT: ASC, PRIORITY: 2}}
  ) {
    id
    title
    created_at
  }
}
    `;