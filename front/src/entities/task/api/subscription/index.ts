import { subscription } from '@/shared/api';

import {
  TaskCreateEvent,
  TaskCreateEventSubscription,
  TaskCreateEventSubscriptionVariables,
} from './create-task.generated';
import {
  TaskUpdateEvent,
  TaskUpdateEventSubscription,
  TaskUpdateEventSubscriptionVariables,
} from './update-task.generated';
import {
  TaskDeleteEvent,
  TaskDeleteEventSubscription,
  TaskDeleteEventSubscriptionVariables,
} from './delete-task.generated';
import {
  TaskSetCurrentEvent,
  TaskSetCurrentEventSubscription,
  TaskSetCurrentEventSubscriptionVariables,
} from './set-current-task.generated';
import {
  TaskChangeStatusEvent,
  TaskChangeStatusEventSubscription,
  TaskChangeStatusEventSubscriptionVariables,
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
