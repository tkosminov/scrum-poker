import { mutation } from '@/shared/api';
import { TaskCreate, type TaskCreateMutation, type TaskCreateMutationVariables } from './create-task.generated';
import { TaskUpdate, type TaskUpdateMutation, type TaskUpdateMutationVariables } from './update-task.generated';
import { TaskDelete, type TaskDeleteMutation, type TaskDeleteMutationVariables } from './delete-task.generated';
import {
  TaskSetCurrent,
  type TaskSetCurrentMutation,
  type TaskSetCurrentMutationVariables,
} from './set-current-task.generated';
import {
  TaskChangeStatus,
  type TaskChangeStatusMutation,
  type TaskChangeStatusMutationVariables,
} from './change-status-task.generated';

export async function taskCreate(variables: TaskCreateMutationVariables) {
  return mutation<TaskCreateMutation>(TaskCreate, variables);
}

export async function taskUpdate(variables: TaskUpdateMutationVariables) {
  return mutation<TaskUpdateMutation>(TaskUpdate, variables);
}

export async function taskDelete(variables: TaskDeleteMutationVariables) {
  return mutation<TaskDeleteMutation>(TaskDelete, variables);
}

export async function taskSetCurrent(variables: TaskSetCurrentMutationVariables) {
  return mutation<TaskSetCurrentMutation>(TaskSetCurrent, variables);
}

export async function taskChangeStatus(variables: TaskChangeStatusMutationVariables) {
  return mutation<TaskChangeStatusMutation>(TaskChangeStatus, variables);
}
