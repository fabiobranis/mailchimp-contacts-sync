import { Axios } from 'axios';
import { RestApiClientInterface } from './interfaces';
import { RestApiClient } from './rest-api-client';
import { RestApiBuilderOptions } from './types';

export function restApiClientBuilder({
  basePath
}: RestApiBuilderOptions): RestApiClientInterface {
  return new RestApiClient(new Axios({ baseURL: basePath.href }));
}
