let enable = false;

export function config(options: {enable?: boolean}) {
  enable = options.enable || false;
}

export default function log(...args: any[]) {
  if (!enable) {
    return;
  }
  console.log(...args);
}
