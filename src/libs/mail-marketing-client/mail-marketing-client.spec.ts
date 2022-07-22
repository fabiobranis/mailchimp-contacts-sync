import mailchimp from '@mailchimp/mailchimp_marketing';
import { MailMarketingClient } from './mail-marketing-client';
import { BatchListMembersResponse } from './types';

jest.mock('@mailchimp/mailchimp_marketing');

describe('MailMarketingClient', () => {
  describe('addOrUpdateListMember method', () => {
    describe('with a successful return from API', () => {
      let result: BatchListMembersResponse;

      beforeAll(async () => {
        mailchimp.setConfig = jest.fn();
        mailchimp.lists.batchListMembers = jest.fn().mockResolvedValue({
          errors: [],
          updated_members: [],
          total_created: 1,
          total_updated: 0,
          error_count: 0,
          new_members: [
            {
              id: 'fake-id',
              email_address: 'fake-email',
              merge_fields: {
                first_name: 'fake-name',
                last_name: 'fake-last-name'
              }
            }
          ]
        });

        const mailMarketingClient: MailMarketingClient =
          new MailMarketingClient({
            apiKey: 'fake-api-key',
            server: 'fake-server'
          });

        result = await mailMarketingClient.batchUpdateListMembers({
          listId: 'fake-list-id',
          members: [
            {
              emailAddress: 'fake-email',
              firstName: 'fake-name',
              lastName: 'fake-last-name'
            }
          ]
        });
      });

      it('should return a BatchListMembersResponse', () => {
        expect(result).toEqual({
          errors: [],
          updatedMembers: [],
          totalCreated: 1,
          totalUpdated: 0,
          errorCount: 0,
          newMembers: [
            {
              id: 'fake-id',
              emailAddress: 'fake-email',
              firstName: 'fake-name',
              lastName: 'fake-last-name'
            }
          ]
        });
      });
    });
    describe('with a error returned from API', () => {
      beforeAll(async () => {
        mailchimp.setConfig = jest.fn();
        mailchimp.lists.batchListMembers = jest.fn().mockResolvedValue({
          status: 500,
          detail: 'Some error'
        });
      });

      it('should throw an Error', () => {
        const mailMarketingClient: MailMarketingClient =
          new MailMarketingClient({
            apiKey: 'fake-api-key',
            server: 'fake-server'
          });

        expect(
          mailMarketingClient.batchUpdateListMembers({
            listId: 'fake-list-id',
            members: [
              {
                emailAddress: 'fake-email',
                firstName: 'fake-name',
                lastName: 'fake-last-name'
              }
            ]
          })
        ).rejects.toThrowError();
      });
    });
  });
});
