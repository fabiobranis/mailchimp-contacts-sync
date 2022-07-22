/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@mailchimp/mailchimp_marketing' {
  export function setConfig(config: Config): void;

  export interface Config {
    apiKey?: string | undefined;
    accessToken?: string | undefined;
    server?: string | undefined;
  }

  export interface Options {
    skipMergeValidation: boolean;
  }

  export type Status =
    | 'subscribed'
    | 'unsubscribed'
    | 'cleaned'
    | 'pending'
    | 'transactional';

  export interface Body {
    status?: Status | undefined;
    email_type?: string | undefined;
    merge_fields?: Record<string, any> | undefined;
    interests?: Record<string, any> | undefined;
    language?: string | undefined;
    vip?: boolean | undefined;
    location?:
      | {
          latitude: number;
          logitude: number;
        }
      | undefined;
    marketing_permissions?:
      | Array<{
          marketing_permission_id: string;
          enabled: boolean;
        }>
      | undefined;
    ip_signup?: string | undefined;
    timestamp_signup?: string | undefined;
    ip_opt?: string | undefined;
    timestamp_opt?: string | undefined;
  }

  export interface AddListMemberBody extends Body {
    email_address: string;
    tags?: string[] | undefined;
  }

  export interface UpdateListMemberBody extends Body {
    email_address?: string | undefined;
  }

  export interface SetListMemberBody extends Body {
    email_address: string;
    status_if_new: Status;
  }

  export type StatusTag = 'active' | 'inactive';

  export interface TagBody {
    name: string;
    status: StatusTag;
  }

  export interface MemberTagsBody {
    tags: TagBody[];
  }

  /*~ If there are types, properties, or methods inside dotted names
   *~ of the module, declare them inside a 'namespace'.
   */
  export namespace lists {
    /*~ For example, given this definition, someone could write:
     *~   import { subProp } from 'yourModule';
     *~   subProp.foo();
     *~ or
     *~   import * as yourMod from 'yourModule';
     *~   yourMod.subProp.foo();
     */
    function setListMember(
      listId: string,
      subscriberHash: string,
      body: SetListMemberBody,
      opts?: Options
    ): Promise<MembersSuccessResponse | MemberErrorResponse>;

    function getListMember(
      listId: string,
      subscriberHash: string,
      opts?: Options
    ): Promise<MembersSuccessResponse | MemberErrorResponse>;

    function addListMember(
      listId: string,
      body: AddListMemberBody,
      opts?: Options
    ): Promise<MembersSuccessResponse | MemberErrorResponse>;

    function updateListMember(
      listId: string,
      subscriberHash: string,
      body: UpdateListMemberBody,
      opts?: Options
    ): Promise<MembersSuccessResponse | MemberErrorResponse>;

    function deleteListMemberPermanent(
      listId: string,
      subscriberHash: string
    ): Promise<void>;

    function updateListMemberTags(
      listId: string,
      subscriberHash: string,
      body: any
    ): Promise<void>;

    function batchListMembers(
      listId: string,
      batchListMembersParameters: BatchListMembersParameters,
      opts?: Options
    ): Promise<BatchUpdateListMembers | MemberErrorResponse>;
  }

  export interface MembersSuccessResponse {
    id: string;
    email_address: string;
    unique_email_id: string;
    contact_id: string;
    full_name: string;
    web_id: number;
    email_type: string;
    status: string;
    unsubscribe_reason: string;
    consents_to_one_to_one_messaging: boolean;
    merge_fields: Record<string, any>;
    interests: Record<string, any>;
    stats: MemberStats;
    ip_signup: string;
    timestamp_signup: string;
    ip_opt: string;
    timestamp_opt: string;
    member_rating: string;
    last_changed: string;
    language: string;
    vip: boolean;
    email_client: string;
    location: FullMemberLocation;
    marketing_permissions: MemberMarketingPermissions[];
    last_note: MemberLastNote;
    source: string;
    tags_count: number;
    tags: Tags[];
    list_id: string;
    _links: Links[];
  }

  export interface MemberStats {
    avg_open_rate: number;
    avg_click_rate: number;
    ecommerce_data: MemberEcommerceData;
  }

  export interface MemberEcommerceData {
    total_revenue: number;
    number_of_orders: number;
    currency_code: number;
  }

  export interface MemberLocation {
    latitude: number;
    logitude: number;
  }

  export interface FullMemberLocation extends MemberLocation {
    gmtoff: number;
    dstoff: number;
    country_code: string;
    timezone: string;
    region: string;
  }

  export interface MemberMarketingPermissions
    extends MemberMarketingPermissionsInput {
    text: string;
  }

  export interface MemberMarketingPermissionsInput {
    marketing_permission_id: string;
    enabled: boolean;
  }

  export interface MemberLastNote {
    note_id: number;
    created_at: string;
    created_by: string;
    note: string;
  }

  export interface BatchUpdateListMembers {
    new_members: Array<MembersSuccessResponse>;
    updated_members: Array<MembersSuccessResponse>;
    errors: Array<BatchListMembersError>;
    total_created: number;
    total_updated: number;
    error_count: number;
    _links: Array<Links>;
  }

  export interface Tags {
    id: number;
    name: string;
  }

  export type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD';

  export interface Links {
    rel: string;
    href: string;
    method: HttpMethod;
    targetSchema: string;
    schema: string;
  }

  export interface BatchListMembersParameters {
    members: Array<Body>;
    sync_tags?: boolean;
    update_existing?: boolean;
  }

  export interface MemberErrorResponse {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
  }

  export interface BatchListMembersError {
    email_address: string;
    error: string;
    error_code: string;
    field: string;
    field_message: string;
  }
}
