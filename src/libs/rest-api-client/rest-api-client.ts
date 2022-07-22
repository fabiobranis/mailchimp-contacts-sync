import { Axios, AxiosResponse } from 'axios';
import { RestApiClientInterface } from './interfaces';
import { CollectionRestApiResponse, RestApiRequestOptions } from './types';

export class RestApiClient implements RestApiClientInterface {
  private readonly httpClient: Axios;

  constructor(httpClient: Axios) {
    this.httpClient = httpClient;
  }

  async get<T>({
    endpoint
  }: RestApiRequestOptions): Promise<CollectionRestApiResponse<T>> {
    const { status, data }: AxiosResponse = await this.httpClient.get(endpoint);
    return {
      body: JSON.parse(data) as Array<T>,
      statusCode: status
    };
  }
}
