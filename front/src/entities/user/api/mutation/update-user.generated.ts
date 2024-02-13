/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type UserUpdateMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type UserUpdateMutation = { userUpdate: { id: string, name: string } };


export const UserUpdate = gql`
    mutation UserUpdate($name: String!) {
  userUpdate(data: {name: $name}) {
    id
    name
  }
}
    `;