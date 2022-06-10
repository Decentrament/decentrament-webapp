export function truncateString(str, num = 0) {
  if (str.length <= num) {
    return str;
  }

  const startOfEnd = str.length - 4;
  const end = str.length;

  return str.slice(0, 5) + "..." + str.slice(startOfEnd, end);
}
