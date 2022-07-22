import { ContactsApiClient } from './contacts-api-client';
import { RestApiClient } from '../../libs/rest-api-client/rest-api-client';
import { Axios } from 'axios';
import { MailContact } from './types';

jest.mock('../../libs/rest-api-client/rest-api-client', () => {
  return {
    RestApiClient: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: [
          {
            id: 'fake-id',
            createdAt: 'fake-date',
            firstName: 'fake-first-name',
            lastName: 'fake-last-name',
            email: 'fake-email',
            avatar: 'fake-path'
          }
        ]
      })
    }))
  };
});

describe('ContactsApiClient', () => {
  describe('getAll', () => {
    let result: Array<MailContact>;
    let restApiClient: RestApiClient;

    beforeAll(async () => {
      restApiClient = new RestApiClient({} as Axios);
      const contactsApiClient = new ContactsApiClient(restApiClient);

      result = await contactsApiClient.getAll();
    });

    it('should return an array of MailContact', () => {
      expect(result).toEqual([
        {
          id: 'fake-id',
          createdAt: 'fake-date',
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          email: 'fake-email',
          avatar: 'fake-path'
        }
      ]);
    });

    it('should call RestAPiClient get method with proper arguments', () => {
      expect(restApiClient.get).toBeCalledWith(
        expect.objectContaining({ endpoint: expect.any(String) })
      );
    });
  });
});
