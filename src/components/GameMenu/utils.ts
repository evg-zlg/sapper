export function checkMinMaxValid(
  min: number | string,
  max: number | string,
  current: number | string,
): boolean {
  const result =
    (Number(current) >= Number(min) && Number(current) <= Number(max)) ||
    Number(current) === 0;
    
  return result;
}
