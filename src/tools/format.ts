export function getIncomeMsg(num: number, delay?: number) {
  const opt = num > 0 ? '+' : '';
  return `${opt} per ${delay || 1}s`;
}
