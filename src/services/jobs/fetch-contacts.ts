import {
  ContactsApiClientInterface,
  MailContact
} from '../../clients/contacts-api';

export function fetchContacts(
  contactsApiClient: ContactsApiClientInterface
): Promise<Array<MailContact>> {
  return contactsApiClient.getAll();
}
