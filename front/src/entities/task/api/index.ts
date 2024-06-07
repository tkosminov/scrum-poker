export { tasks } from './query';
export { type TasksQuery, type TasksQueryVariables } from './query/tasks.generated';

export { taskCreate, taskUpdate, taskDelete, taskSetCurrent, taskChangeStatus } from './mutation';
export { type TaskCreateMutation, type TaskCreateMutationVariables } from './mutation/create-task.generated';
export { type TaskUpdateMutation, type TaskUpdateMutationVariables } from './mutation/update-task.generated';
export { type TaskDeleteMutation, type TaskDeleteMutationVariables } from './mutation/delete-task.generated';
export {
  type TaskSetCurrentMutation,
  type TaskSetCurrentMutationVariables,
} from './mutation/set-current-task.generated';
export {
  type TaskChangeStatusMutation,
  type TaskChangeStatusMutationVariables,
} from './mutation/change-status-task.generated';

export {
  taskCreateEvent,
  taskUpdateEvent,
  taskDeleteEvent,
  taskSetCurrentEvent,
  taskChangeStatusEvent,
} from './subscription';
export {
  type TaskCreateEventSubscription,
  type TaskCreateEventSubscriptionVariables,
} from './subscription/create-task.generated';
export {
  type TaskUpdateEventSubscription,
  type TaskUpdateEventSubscriptionVariables,
} from './subscription/update-task.generated';
export {
  type TaskDeleteEventSubscription,
  type TaskDeleteEventSubscriptionVariables,
} from './subscription/delete-task.generated';
export {
  type TaskSetCurrentEventSubscription,
  type TaskSetCurrentEventSubscriptionVariables,
} from './subscription/set-current-task.generated';
export {
  type TaskChangeStatusEventSubscription,
  type TaskChangeStatusEventSubscriptionVariables,
} from './subscription/change-status-task.generated';
