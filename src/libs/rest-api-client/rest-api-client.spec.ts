import { Axios } from 'axios';
import { RestApiClient } from './rest-api-client';

type FakeType = {
  foo: string;
};

jest.mock('axios', () => {
  return {
    Axios: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({
        status: 200,
        data: '[{ "foo": "first" }, { "foo": "second" }]'
      })
    }))
  };
});

describe('RestApiClient', () => {
  describe('with a valid Axios instance', () => {
    describe('get method', () => {
      it('should receive response', () => {
        const restApiClient = new RestApiClient(new Axios());
        expect(
          restApiClient.get<FakeType>({ endpoint: '/' })
        ).resolves.toMatchObject({
          statusCode: 200,
          body: expect.arrayContaining([
            expect.objectContaining({ foo: expect.any(String) })
          ])
        });
      });
    });
  });
});
