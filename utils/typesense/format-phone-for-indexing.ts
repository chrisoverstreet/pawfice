export default function formatPhoneNumberForIndexing(input: string) {
  const digits = input.slice(1);
  const areaCode = digits.slice(1, 4);
  const firstPart = digits.slice(4, 7);
  const secondPart = digits.slice(7);

  return [
    `+1 (${areaCode}) ${firstPart}-${secondPart}`,
    digits,
    digits.slice(1),
    digits.slice(4),
  ];
}
