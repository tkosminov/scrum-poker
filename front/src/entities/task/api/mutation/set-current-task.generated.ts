/* eslint-disable */
import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
export type TaskSetCurrentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskSetCurrentMutation = { taskSetCurrent: { id: string, room_id: string } };


export const TaskSetCurrent = gql`
    mutation TaskSetCurrent($id: ID!) {
  taskSetCurrent(data: {id: $id}) {
    id
    room_id
  }
}
    `;