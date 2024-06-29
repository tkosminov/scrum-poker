import { query } from '@/shared/api';

import { Votes, type VotesQuery, type VotesQueryVariables } from './votes.generated';
import { VotesFull, type VotesFullQuery, type VotesFullQueryVariables } from './votes-full.generated';
import { VoteCurrent, type VoteCurrentQuery, type VoteCurrentQueryVariables } from './vote-current.generated';

export function votes(variables: VotesQueryVariables) {
  return query<VotesQuery>(Votes, variables);
}

export function votesFull(variables: VotesFullQueryVariables) {
  return query<VotesFullQuery>(VotesFull, variables);
}

export function voteCurrent(variables: VoteCurrentQueryVariables) {
  return query<VoteCurrentQuery>(VoteCurrent, variables);
}
