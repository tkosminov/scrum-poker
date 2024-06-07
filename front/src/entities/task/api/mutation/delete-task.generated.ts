/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskDeleteMutation = { taskDelete: { id: string, room_id: string } };


export const TaskDelete = gql`
    mutation TaskDelete($id: ID!) {
  taskDelete(data: {id: $id}) {
    id
    room_id
  }
}
    `;