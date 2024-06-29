import { mutation } from '@/shared/api';
import { VoteChange, type VoteChangeMutation, type VoteChangeMutationVariables } from './change-vote.generated';

export async function voteChange(variables: VoteChangeMutationVariables) {
  return mutation<VoteChangeMutation>(VoteChange, variables);
}
