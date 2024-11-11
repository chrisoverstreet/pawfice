export default function formatDateForIndexing(date: Date | string) {
  return parseInt((new Date(date).valueOf() / 1000).toFixed(), 0);
}
