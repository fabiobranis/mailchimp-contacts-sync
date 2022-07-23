import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import { contactsApiClientBuilder } from './clients/contacts-api';
import { AppContainer } from './types';
import { ConfigurationError } from './errors';
import { mailMarketingClientBuilder } from './libs/mail-marketing-client';
import { syncContacts } from './services/sync-contacts.service';
import { errorMiddleware } from './middlewares';

const app: Express = express();
const port: number | string = process.env.PORT ?? 3000;
const listId: string | undefined = process.env.LIST_ID;

if (listId == null) {
  throw new ConfigurationError('No list id provided');
}

const { contactsApiClient, mailMarketingClient } = buildClients();

app.use(bodyParser.json());

app.get(
  '/contacts/sync',
  asyncHandler(async (_req: Request, res: Response) => {
    const apiResponse = await syncContacts(
      listId,
      contactsApiClient,
      mailMarketingClient
    );

    res.type('json');
    res.send(apiResponse);
  })
);

app.use(errorMiddleware);

app.listen(port);

function buildClients(): AppContainer {
  const contactsApiBasePath: string | undefined =
    process.env.CONTACTS_API_BASE_PATH;
  const mailMarketingApiKey: string | undefined =
    process.env.MAIL_MARKETING_API_KEY;
  const mailMarketingServer: string | undefined =
    process.env.MAIL_MARKETING_SERVER;

  if (contactsApiBasePath == null) {
    throw new ConfigurationError('No contacts API base url provided');
  }

  if (mailMarketingApiKey == null) {
    throw new ConfigurationError('No mail marketing API KEY provided');
  }

  if (mailMarketingServer == null) {
    throw new ConfigurationError('No mail marketing API SERVER provided');
  }

  return {
    contactsApiClient: contactsApiClientBuilder(new URL(contactsApiBasePath)),
    mailMarketingClient: mailMarketingClientBuilder({
      apiKey: mailMarketingApiKey,
      server: mailMarketingServer
    })
  };
}
