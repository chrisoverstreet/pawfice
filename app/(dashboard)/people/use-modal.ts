import { parseAsStringLiteral, useQueryState } from 'nuqs';

export default function useModal() {
  return useQueryState('modal', parseAsStringLiteral<'add-user'>(['add-user']));
}
