export function getDigitsFromNUmber(n: number): string[] {
  const digits = String(n).split('');
  if (n > 9 && n < 100) digits.unshift('0');
  if (n < 10) {
    digits.unshift('0');
    digits.unshift('0');
  }
  return digits;
}