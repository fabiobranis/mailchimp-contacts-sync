import { MailContact } from './mail-contact.type';

export type CompleteMailContact = {
  id: string;
  createdAt: string;
  avatar: string;
} & MailContact;
