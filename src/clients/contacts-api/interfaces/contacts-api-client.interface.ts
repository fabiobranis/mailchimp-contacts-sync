import { MailContact } from '../types/mail-contact.type';

export interface ContactsApiClientInterface {
  getAll(): Promise<Array<MailContact>>;
}
