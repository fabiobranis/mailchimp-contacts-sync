import {
  ContactsApiClientInterface,
  MailContact
} from '../clients/contacts-api';
import {
  BatchListMembersResponse,
  ListMember,
  MailMarketingClientInterface
} from '../libs/mail-marketing-client';
import {
  buildResponse,
  fetchContacts,
  logMembersErrors,
  parseContacts,
  sendContacts
} from './jobs';
import { SyncContactsResponse } from './types';

export async function syncContacts(
  listId: string,
  contactsApiClient: ContactsApiClientInterface,
  mailMarketingClient: MailMarketingClientInterface
): Promise<SyncContactsResponse> {
  const contacts: Array<MailContact> = await fetchContacts(contactsApiClient);
  const parsedContacts: Array<ListMember> = parseContacts(contacts);
  const response: BatchListMembersResponse = await sendContacts(
    mailMarketingClient,
    listId,
    parsedContacts
  );

  if (response.errorCount > 0) {
    logMembersErrors(response.errors);
  }

  return buildResponse(response);
}
