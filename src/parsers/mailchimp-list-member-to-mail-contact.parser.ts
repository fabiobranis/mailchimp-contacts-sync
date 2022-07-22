import { MailContact } from '../clients/contacts-api';
import { ListMemberResponse } from '../libs/mail-marketing-client';

export function mailchimpListMemberToMailContact({
  emailAddress,
  firstName,
  lastName
}: ListMemberResponse): MailContact {
  return {
    email: emailAddress,
    firstName,
    lastName
  };
}
