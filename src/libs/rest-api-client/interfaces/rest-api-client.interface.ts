import { CollectionRestApiResponse, RestApiRequestOptions } from '../types';

export interface RestApiClientInterface {
  get<T>(
    restApiRequestOptions: RestApiRequestOptions
  ): Promise<CollectionRestApiResponse<T>>;
}
