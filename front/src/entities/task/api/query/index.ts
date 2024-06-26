import { query } from '@/shared/api';

import { Tasks, type TasksQuery, type TasksQueryVariables } from './tasks.generated';

export function tasks(variables: TasksQueryVariables) {
  return query<TasksQuery>(Tasks, variables);
}
