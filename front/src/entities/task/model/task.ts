import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { BehaviorSubject } from 'rxjs';

import {
  tasks,
  type TasksQuery,
  type TasksQueryVariables,
  taskCreate,
  type TaskCreateMutationVariables,
  taskUpdate,
  type TaskUpdateMutationVariables,
  taskDelete,
  type TaskDeleteMutationVariables,
  taskSetCurrent,
  type TaskSetCurrentMutationVariables,
  taskChangeStatus,
  type TaskChangeStatusMutationVariables,
  taskCreateEvent,
  type TaskCreateEventSubscriptionVariables,
  taskUpdateEvent,
  type TaskUpdateEventSubscriptionVariables,
  taskDeleteEvent,
  type TaskDeleteEventSubscriptionVariables,
  taskSetCurrentEvent,
  type TaskSetCurrentEventSubscriptionVariables,
  taskChangeStatusEvent,
  type TaskChangeStatusEventSubscriptionVariables,
} from '../api';

interface IState {
  loading: boolean;
  loading_error: string | undefined;
  stoppers: Array<() => void>;
  tasks: TasksQuery['tasks'];
  current_task_id: string | null;
  current_task: TasksQuery['tasks'][0] | undefined;
  deleted_id$: BehaviorSubject<string>;
}

export const useTaskModel = defineStore({
  id: 'taskModel',
  state: (): IState => ({
    stoppers: [],
    loading: false,
    loading_error: undefined,
    tasks: [],
    current_task_id: null,
    current_task: undefined,
    deleted_id$: new BehaviorSubject(''),
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.loading_error = undefined;
      this.tasks = [];
      this.current_task_id = null;
      this.current_task = undefined;
      this.deleted_id$.next('');
    },
    initCurrentTask(task_id: string | null) {
      if (task_id) {
        this.current_task_id = task_id;
      }

      const idx = this.tasks.findIndex((r) => r.id === this.current_task_id);

      if (idx !== -1) {
        this.current_task = this.tasks[idx];
      } else {
        this.current_task = undefined;
      }
    },
    async fetchTasks(variables: TasksQueryVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { loading, result, error } = await tasks(variables);

      const response = computed(() => result.value?.tasks ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.tasks = response.value;

            this.initCurrentTask(null);

            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async create(variables: TaskCreateMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await taskCreate(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async update(variables: TaskUpdateMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await taskUpdate(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async delete(variables: TaskDeleteMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await taskDelete(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async setCurrent(variables: TaskSetCurrentMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await taskSetCurrent(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async changeStatus(variables: TaskChangeStatusMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await taskChangeStatus(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    unsubscribe() {
      this.stoppers.forEach((stop) => {
        stop();
      });

      this.stoppers = [];
    },
    async createSubscribe(variables: TaskCreateEventSubscriptionVariables) {
      const { onResult, onError, stop } = await taskCreateEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.tasks.unshift(data!.taskCreateEvent as TasksQuery['tasks'][0]);
      });

      onError((error) => {
        console.error(error);
      });
    },
    async updateSubscribe(variables: TaskUpdateEventSubscriptionVariables) {
      const { onResult, onError, stop } = await taskUpdateEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.tasks.findIndex((r) => r.id === data!.taskUpdateEvent.id);

        if (idx !== -1) {
          this.tasks[idx].title = data!.taskUpdateEvent.title;
        }

        if (this.current_task?.id === data!.taskUpdateEvent.id) {
          this.current_task.title = data!.taskUpdateEvent.title;
        }
      });

      onError((error) => {
        console.error(error);
      });
    },
    async deleteSubscribe(variables: TaskDeleteEventSubscriptionVariables) {
      const { onResult, onError, stop } = await taskDeleteEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.tasks.findIndex((r) => r.id === data!.taskDeleteEvent.id);

        if (idx !== -1) {
          this.tasks.splice(idx, 1);
        }

        if (this.current_task?.id === data!.taskDeleteEvent.id) {
          this.current_task = undefined;
          this.current_task_id = null;
        }

        this.deleted_id$.next(data!.taskDeleteEvent.id);
        this.deleted_id$.next('');
      });

      onError((error) => {
        console.error(error);
      });
    },
    async setCurrentSubscribe(variables: TaskSetCurrentEventSubscriptionVariables) {
      const { onResult, onError, stop } = await taskSetCurrentEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.initCurrentTask(data!.taskSetCurrentEvent.id);
      });

      onError((error) => {
        console.error(error);
      });
    },
    async changeStatusSubscribe(variables: TaskChangeStatusEventSubscriptionVariables) {
      const { onResult, onError, stop } = await taskChangeStatusEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.tasks.findIndex((r) => r.id === data!.taskChangeStatusEvent.id);

        if (idx !== -1) {
          this.tasks[idx] = data!.taskChangeStatusEvent;
        }

        if (this.current_task?.id === data!.taskChangeStatusEvent.id) {
          this.current_task = data!.taskChangeStatusEvent;
        }
      });

      onError((error) => {
        console.error(error);
      });
    },
  },
});
