import { parseAsStringLiteral, useQueryState } from 'nuqs';

export default function usePeoplePageModal() {
  return useQueryState('modal', parseAsStringLiteral(['add-user']));
}
