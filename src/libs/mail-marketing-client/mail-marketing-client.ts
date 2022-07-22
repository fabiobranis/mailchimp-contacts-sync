import mailchimp from '@mailchimp/mailchimp_marketing';
import { MEMBER_STATUS, UPDATE_EXISTING_MEMBERS } from './constants';
import { MailMarketingRequestError } from './errors';
import { MailMarketingClientInterface } from './interfaces';
import {
  BatchListMembersResponse,
  ListMember,
  ListMemberOptions,
  MailMarketingConfigOptions
} from './types';

export class MailMarketingClient implements MailMarketingClientInterface {
  constructor({ apiKey, server }: MailMarketingConfigOptions) {
    mailchimp.setConfig({ apiKey, server });
  }

  async batchUpdateListMembers({
    listId,
    members
  }: ListMemberOptions): Promise<BatchListMembersResponse> {
    const response:
      | mailchimp.BatchUpdateListMembers
      | mailchimp.MemberErrorResponse = await mailchimp.lists.batchListMembers(
      listId,
      {
        update_existing: UPDATE_EXISTING_MEMBERS,
        members: members.map(
          ({ emailAddress, firstName, lastName }: ListMember) => ({
            email_address: emailAddress,
            status: MEMBER_STATUS,
            merge_fields: {
              first_name: firstName,
              last_name: lastName
            }
          })
        )
      }
    );

    if (Object.prototype.hasOwnProperty.call(response, 'status')) {
      throw new MailMarketingRequestError();
    }

    const {
      error_count: errorCount,
      errors,
      new_members,
      total_created: totalCreated,
      total_updated: totalUpdated,
      updated_members
    }: mailchimp.BatchUpdateListMembers = response as mailchimp.BatchUpdateListMembers;

    return {
      errorCount,
      errors: errors.map(
        ({ email_address, error, error_code, field, field_message }) => ({
          emailAddress: email_address,
          error,
          errorCode: error_code,
          field,
          fieldMessage: field_message
        })
      ),
      newMembers: new_members.map(({ id, email_address, merge_fields }) => ({
        id,
        emailAddress: email_address,
        firstName: merge_fields.first_name,
        lastName: merge_fields.last_name
      })),
      updatedMembers: updated_members.map(
        ({ id, email_address, merge_fields }) => ({
          id,
          emailAddress: email_address,
          firstName: merge_fields.first_name,
          lastName: merge_fields.last_name
        })
      ),
      totalCreated,
      totalUpdated
    };
  }
}
