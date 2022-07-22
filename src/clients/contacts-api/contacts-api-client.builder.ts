import { restApiClientBuilder } from '../../libs';
import { ContactsApiClient } from './contacts-api-client';

export function contactsApiClientBuilder(basePath: URL) {
  return new ContactsApiClient(restApiClientBuilder({ basePath }));
}
