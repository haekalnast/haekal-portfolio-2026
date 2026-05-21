export function hasMalformedPercentEncoding(value: string): boolean {
  return /%(?![0-9A-Fa-f]{2})/.test(value);
}
