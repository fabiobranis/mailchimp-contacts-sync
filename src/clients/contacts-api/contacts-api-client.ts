import {
  CollectionRestApiResponse,
  RestApiClientInterface
} from '../../libs/rest-api-client';
import { ContactsApiClientInterface } from './interfaces';
import { CompleteMailContact, MailContact } from './types';
import contactsApiClientConfig from './config/endpoints.json';

export class ContactsApiClient implements ContactsApiClientInterface {
  private readonly restApiClient: RestApiClientInterface;

  constructor(restApiClient: RestApiClientInterface) {
    this.restApiClient = restApiClient;
  }

  async getAll(): Promise<Array<MailContact>> {
    const contacts: CollectionRestApiResponse<CompleteMailContact> =
      await this.restApiClient.get<CompleteMailContact>({
        endpoint: contactsApiClientConfig.getAll
      });
    return contacts.body;
  }
}
