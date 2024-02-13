/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type RoomCreateMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input'];
}>;


export type RoomCreateMutation = { roomCreate: { id: string, title: string | null, created_at: any } };


export const RoomCreate = gql`
    mutation RoomCreate($title: String!) {
  roomCreate(data: {title: $title}) {
    id
    title
    created_at
  }
}
    `;