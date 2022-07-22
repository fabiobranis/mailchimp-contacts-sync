import { MailMarketingClientInterface } from './interfaces';
import { MailMarketingClient } from './mail-marketing-client';
import { MailMarketingConfigOptions } from './types';

export function mailMarketingClientBuilder(
  mailMarketingClientOptions: MailMarketingConfigOptions
): MailMarketingClientInterface {
  return new MailMarketingClient(mailMarketingClientOptions);
}
