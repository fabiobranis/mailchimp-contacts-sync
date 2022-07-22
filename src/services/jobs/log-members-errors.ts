import { BatchListMembersError } from '../../libs/mail-marketing-client';
import pino from 'pino';

const logger = pino();

export function logMembersErrors(errors: Array<BatchListMembersError>) {
  logger.warn(`Contacts not synced: ${errors}`);
}
