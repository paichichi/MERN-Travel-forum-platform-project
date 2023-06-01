export function toSentenceCase(str) {
  if (str === null || str === '') return str;

  return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
    return c.toUpperCase();
  });
}
