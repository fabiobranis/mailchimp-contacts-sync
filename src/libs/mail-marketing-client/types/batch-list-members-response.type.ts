import { BatchListMembersError } from './batch-list-members-error.type';
import { ListMemberResponse } from './list-member-response.type';

export type BatchListMembersResponse = {
  newMembers: Array<ListMemberResponse>;
  updatedMembers: Array<ListMemberResponse>;
  errors: Array<BatchListMembersError>;
  totalCreated: number;
  totalUpdated: number;
  errorCount: number;
};
