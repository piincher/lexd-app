import { userData } from '@src/shared/types/user';

const MIN_QUERY_LENGTH = 2;
const MIN_PHONE_QUERY_DIGITS = 2;

export const matchesUserQuery = (user: userData, rawQuery: string): boolean => {
  const query = rawQuery.toLowerCase().trim();
  if (query.length < MIN_QUERY_LENGTH) return false;

  const first = user.firstName?.toLowerCase() || '';
  const last = user.lastName?.toLowerCase() || '';
  const fullName = `${first} ${last}`.trim();
  const nameMatch =
    (!!first && first.includes(query)) ||
    (!!last && last.includes(query)) ||
    (!!fullName && fullName.includes(query));

  const queryDigits = query.replace(/\D/g, '');
  const phoneDigits = user.phoneNumber?.replace(/\D/g, '') || '';
  const phoneMatch =
    queryDigits.length >= MIN_PHONE_QUERY_DIGITS &&
    phoneDigits.length > 0 &&
    phoneDigits.includes(queryDigits);

  return nameMatch || phoneMatch;
};

export const hasSearchIntent = (rawQuery: string): boolean => {
  const query = rawQuery.trim();
  const digitCount = query.replace(/\D/g, '').length;
  return query.length >= MIN_QUERY_LENGTH || digitCount >= MIN_PHONE_QUERY_DIGITS;
};
