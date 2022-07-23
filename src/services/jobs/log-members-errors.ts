import { BatchListMembersError } from '../../libs/mail-marketing-client';
import pino from 'pino';
import { EOL } from 'os';

const logger = pino();

export function logMembersErrors(errors: Array<BatchListMembersError>) {
  logger.warn(
    'Contacts not synced:' + errors.map((error) => buildErrorMessage(error))
  );
}

function buildErrorMessage({
  emailAddress,
  error,
  errorCode,
  field,
  fieldMessage
}: BatchListMembersError): string {
  return `Email Address: ${emailAddress}, error: ${error}, code: ${errorCode}, field: ${field}, message: ${fieldMessage}${EOL}`;
}
