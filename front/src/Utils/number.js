export const productNegativeNum = (num) => {
  return num < 0 ? 0 : num;
};

export const salePercent = (num) => {
  return `${Math.floor(num * 100).toString()}%`;
};

export const convertToWon = (price) => {
  // price.toString().length % 3

  // price 50000

  const strings = price.toString().split('');

  // strings = [5,0,0,0,0]

  const split = [];

  let curr = 0;

  for (let i = strings.length - 1; i >= 0; i--) {
    split[curr] = (split[curr] || '') + strings[i];

    if (split[curr].length >= 3) {
      curr++;
    }
  }

  // split = ['000', '05']

  const result = split
    .reverse()
    .map((r) => r.split('').reverse().join(''))
    .join(',');

  // ['05', '000']
  // ['0', '5'] => ['5', '0'] => '50'
  // ['0', '0', '0] => ['0', '0', '0] => '000'
  // ['50', '000']
  // '50,000'

  return result;
};
