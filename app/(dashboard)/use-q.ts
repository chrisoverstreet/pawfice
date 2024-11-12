import { parseAsString, useQueryState } from 'nuqs';

export default function useQ() {
  return useQueryState('q', parseAsString.withDefault(''));
}
