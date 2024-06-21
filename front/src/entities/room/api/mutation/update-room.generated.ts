/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  title: Types.Scalars['String']['input'];
}>;


export type RoomUpdateMutation = { roomUpdate: { id: string, title: string, created_at: any } };


export const RoomUpdate = gql`
    mutation RoomUpdate($id: ID!, $title: String!) {
  roomUpdate(data: {id: $id, title: $title}) {
    id
    title
    created_at
  }
}
    `;