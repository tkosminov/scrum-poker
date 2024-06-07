import { mutation } from '@/shared/api';
import { TaskCreateMutationVariables, TaskCreateMutation, TaskCreate } from './create-task.generated';
import { TaskUpdateMutationVariables, TaskUpdateMutation, TaskUpdate } from './update-task.generated';
import { TaskDeleteMutationVariables, TaskDeleteMutation, TaskDelete } from './delete-task.generated';
import { TaskSetCurrentMutationVariables, TaskSetCurrentMutation, TaskSetCurrent } from './set-current-task.generated';
import {
  TaskChangeStatusMutationVariables,
  TaskChangeStatusMutation,
  TaskChangeStatus,
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
