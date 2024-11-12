import { parseAsStringLiteral, useQueryState } from 'nuqs';

export default function useUserPageModal() {
  return useQueryState('modal', parseAsStringLiteral(['edit-avatar']));
}
