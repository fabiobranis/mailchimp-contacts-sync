import {
  BatchListMembersResponse,
  ListMember,
  MailMarketingClientInterface
} from '../../libs/mail-marketing-client';

export function sendContacts(
  mailMarketingClientInterface: MailMarketingClientInterface,
  listId: string,
  members: Array<ListMember>
): Promise<BatchListMembersResponse> {
  return mailMarketingClientInterface.batchUpdateListMembers({
    listId,
    members
  });
}
