import { RestApiResponse } from './rest-api-response.type';

export type CollectionRestApiResponse<T> = RestApiResponse & { body: Array<T> };
