import { MailContact } from '../../clients/contacts-api';

export type SyncContactsResponse = {
  syncedContacts: number;
  contacts: Array<MailContact>;
};
