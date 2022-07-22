import { ContactsApiClientInterface } from '../clients/contacts-api';
import { MailMarketingClientInterface } from '../libs/mail-marketing-client';

export type AppContainer = {
  contactsApiClient: ContactsApiClientInterface;
  mailMarketingClient: MailMarketingClientInterface;
};
