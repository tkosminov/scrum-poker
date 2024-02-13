/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: { id: string, name: string } };


export const CurrentUser = gql`
    query CurrentUser {
  currentUser {
    id
    name
  }
}
    `;