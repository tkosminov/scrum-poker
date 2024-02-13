/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RoomsQuery = { rooms: Array<{ id: string, title: string | null, created_at: any }> };


export const Rooms = gql`
    query Rooms {
  rooms(ORDER: {created_at: {SORT: DESC}, id: {SORT: ASC}}) {
    id
    title
    created_at
  }
}
    `;