import { subscription } from '@/shared/api';

import {
  TaskCreateEvent,
  type TaskCreateEventSubscription,
  type TaskCreateEventSubscriptionVariables,
} from './create-task.generated';
import {
  TaskUpdateEvent,
  type TaskUpdateEventSubscription,
  type TaskUpdateEventSubscriptionVariables,
} from './update-task.generated';
import {
  TaskDeleteEvent,
  type TaskDeleteEventSubscription,
  type TaskDeleteEventSubscriptionVariables,
} from './delete-task.generated';
import {
  TaskSetCurrentEvent,
  type TaskSetCurrentEventSubscription,
  type TaskSetCurrentEventSubscriptionVariables,
} from './set-current-task.generated';
import {
  TaskChangeStatusEvent,
  type TaskChangeStatusEventSubscription,
  type TaskChangeStatusEventSubscriptionVariables,
} from './change-status-task.generated';

export function taskCreateEvent(variables: TaskCreateEventSubscriptionVariables) {
  return subscription<TaskCreateEventSubscription>(TaskCreateEvent, variables);
}

export function taskUpdateEvent(variables: TaskUpdateEventSubscriptionVariables) {
  return subscription<TaskUpdateEventSubscription>(TaskUpdateEvent, variables);
}

export function taskDeleteEvent(variables: TaskDeleteEventSubscriptionVariables) {
  return subscription<TaskDeleteEventSubscription>(TaskDeleteEvent, variables);
}

export function taskSetCurrentEvent(variables: TaskSetCurrentEventSubscriptionVariables) {
  return subscription<TaskSetCurrentEventSubscription>(TaskSetCurrentEvent, variables);
}

export function taskChangeStatusEvent(variables: TaskChangeStatusEventSubscriptionVariables) {
  return subscription<TaskChangeStatusEventSubscription>(TaskChangeStatusEvent, variables);
}
