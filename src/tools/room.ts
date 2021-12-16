export function needsWorkshop(type?: string) {
  return type == 'weapon' || type == 'upgrade' || type == 'tool';
}
