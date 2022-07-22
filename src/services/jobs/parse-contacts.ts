import { MailContact } from '../../clients/contacts-api';
import { ListMember } from '../../libs/mail-marketing-client';
import { mailContactToMailchimpListMember } from '../../parsers';

export function parseContacts(contacts: Array<MailContact>): Array<ListMember> {
  return contacts.map((contact: MailContact) =>
    mailContactToMailchimpListMember(contact)
  );
}
