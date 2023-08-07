// Алгоритм итеративного решения
export const fibIterative = (n: number): any => {
  if (n < 1 || n > 19) {
    return;
  }

  let array: number[] = [1, 1];

  for (let i = 2; i <= n; i++) {
    array.push(array[i - 2] + array[i - 1]);
  }

  return array;
};
