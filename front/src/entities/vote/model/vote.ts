import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import {
  votes,
  type VotesQueryVariables,
  votesFull,
  type VotesFullQueryVariables,
  voteCurrent,
  type VoteCurrentQueryVariables,
  voteChange,
  type VoteChangeMutationVariables,
  voteChangeEvent,
  type VoteChangeEventSubscriptionVariables,
  votesGetEvent,
  type VotesGetEventSubscriptionVariables,
} from '../api';

interface IState {
  loading: boolean;
  query_error: string | undefined;
  mutation_error: string | undefined;
  subscription_error: string | undefined;
  stoppers: Array<() => void>;
  votes: Map<string, number | null>;
  current_vote: number | undefined;
}

export const useVoteModel = defineStore({
  id: 'voteModel',
  state: (): IState => ({
    stoppers: [],
    loading: false,
    query_error: undefined,
    mutation_error: undefined,
    subscription_error: undefined,
    votes: new Map(),
    current_vote: undefined,
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.query_error = undefined;
      this.mutation_error = undefined;
      this.subscription_error = undefined;
      this.votes = new Map();
      this.current_vote = undefined;
    },
    async fetchVotes(variables: VotesQueryVariables) {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await votes(variables);

      const response = computed(() => result.value?.votes ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.votes = response.value.reduce<Map<string, number | null>>((acc, curr) => {
              acc.set(curr.room_user.user_id, null);

              return acc;
            }, new Map());

            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async fetchVotesFull(variables: VotesFullQueryVariables) {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await votesFull(variables);

      const response = computed(() => result.value?.votes ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.votes = response.value.reduce<Map<string, number | null>>((acc, curr) => {
              acc.set(curr.room_user.user_id, curr.point);

              return acc;
            }, new Map());

            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async fetchVoteCurrent(variables: VoteCurrentQueryVariables) {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await voteCurrent(variables);

      const response = computed(() => result.value?.voteCurrent?.point ?? undefined);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.current_vote = response.value;

            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async change(variables: VoteChangeMutationVariables) {
      const { mutate, onDone, onError } = await voteChange(variables);

      mutate();

      return new Promise((resolve, reject) => {
        onDone(() => {
          this.current_vote = variables.point;
          this.mutation_error = undefined;

          resolve(null);
        });

        onError((error) => {
          this.current_vote = undefined;
          let message: string = '';

          error.graphQLErrors.forEach((gql_err) => {
            message += (gql_err.extensions.originalError as { message: string[] }).message.join('; ');
          });

          this.mutation_error = message;

          reject(new Error(this.mutation_error));
        });
      });
    },
    unsubscribe() {
      this.stoppers.forEach((stop) => {
        stop();
      });

      this.stoppers = [];
    },
    async changeSubscribe(variables: VoteChangeEventSubscriptionVariables) {
      const { onResult, onError, stop } = await voteChangeEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.votes.set(data!.voteChangeEvent.room_user.user_id, null);
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
    async getSubscribe(variables: VotesGetEventSubscriptionVariables) {
      const { onResult, onError, stop } = await votesGetEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.votes = data!.votesGetEvent.reduce<Map<string, number | null>>((acc, curr) => {
          acc.set(curr.room_user.user_id, curr.point);

          return acc;
        }, new Map());
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
  },
});
