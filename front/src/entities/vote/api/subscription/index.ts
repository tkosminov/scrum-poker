import { subscription } from '@/shared/api';

import {
  VoteChangeEvent,
  type VoteChangeEventSubscription,
  type VoteChangeEventSubscriptionVariables,
} from './change-vote.generated';
import {
  VotesGetEvent,
  type VotesGetEventSubscription,
  type VotesGetEventSubscriptionVariables,
} from './get-votes.generated';

export function voteChangeEvent(variables: VoteChangeEventSubscriptionVariables) {
  return subscription<VoteChangeEventSubscription>(VoteChangeEvent, variables);
}

export function votesGetEvent(variables: VotesGetEventSubscriptionVariables) {
  return subscription<VotesGetEventSubscription>(VotesGetEvent, variables);
}
