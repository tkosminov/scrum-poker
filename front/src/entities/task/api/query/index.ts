import { query } from '@/shared/api';

import { Tasks, TasksQuery, TasksQueryVariables } from './tasks.generated';

export function tasks(variables: TasksQueryVariables) {
  return query<TasksQuery>(Tasks, variables);
}
