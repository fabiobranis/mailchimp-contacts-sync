import { BatchListMembersResponse } from '../../libs/mail-marketing-client';
import { mailchimpListMemberToMailContact } from '../../parsers';
import { SyncContactsResponse } from '../types';

export function buildResponse(
  batchListMembersResponse: BatchListMembersResponse
): SyncContactsResponse {
  return {
    syncedContacts:
      batchListMembersResponse.totalCreated +
      batchListMembersResponse.totalUpdated,
    contacts: batchListMembersResponse.newMembers
      .concat(batchListMembersResponse.updatedMembers)
      .map((member) => mailchimpListMemberToMailContact(member))
  };
}
