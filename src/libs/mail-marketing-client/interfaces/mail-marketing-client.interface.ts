import { BatchListMembersResponse, ListMemberOptions } from '../types';

export interface MailMarketingClientInterface {
  batchUpdateListMembers(
    listMemberOptions: ListMemberOptions
  ): Promise<BatchListMembersResponse>;
}
