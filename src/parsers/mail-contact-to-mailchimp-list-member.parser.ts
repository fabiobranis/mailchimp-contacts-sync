import { MailContact } from '../clients/contacts-api';
import { ListMember } from '../libs/mail-marketing-client';

export function mailContactToMailchimpListMember({
  email,
  firstName,
  lastName
}: MailContact): ListMember {
  return {
    emailAddress: email,
    firstName,
    lastName
  };
}
