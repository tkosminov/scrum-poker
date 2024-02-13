/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RoomDeleteMutation = { roomDelete: { id: string, title: string | null, created_at: any } };


export const RoomDelete = gql`
    mutation RoomDelete($id: ID!) {
  roomDelete(data: {id: $id}) {
    id
    title
    created_at
  }
}
    `;