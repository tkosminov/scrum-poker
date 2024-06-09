export function pluck<T, K>(array: T[], key: string): K[] {
  return array.map((a) => a[key]);
}

export function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function reduceToObject<T>(array: T[], key: string): { [K: string]: T } {
  return array.reduce((acc, curr) => {
    acc[curr[key]] = curr;

    return acc;
  }, {});
}

export function groupBy<T>(array: T[], key: string): { [key: string]: T[] } {
  return array.reduce(
    (acc, curr) => {
      if (!acc.hasOwnProperty(curr[key])) {
        acc[curr[key]] = [];
      }

      acc[curr[key]].push(curr);

      return acc;
    },
    {} as { [key: string]: T[] }
  );
}

export function findClosestNumbers(arr: number[], value: number) {
  const sorted_arr = arr.sort((a, b) => a - b);

  for (let i = 0; i < sorted_arr.length; i++) {
    if (value === sorted_arr[i]) {
      return [sorted_arr[i]];
    }

    if (value > sorted_arr[i] && value < sorted_arr[i + 1]) {
      return [sorted_arr[i], sorted_arr[i + 1]];
    }
  }

  if (value < sorted_arr[0]) {
    return [sorted_arr[0]];
  }

  return [sorted_arr[sorted_arr.length - 1]];
}
