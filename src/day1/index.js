import resolveDirname from '../utils/resolveDirname.js';
import fetchFileData from '../utils/fetchFileData.js';
import path from 'path';

const part1 = async () => {
  try {
    const filePath = path.resolve(resolveDirname(import.meta.url), 'input.txt');
    const data = await fetchFileData(filePath);
    const dataArray = data.trim().split('\n');
  
    return dataArray.reduce((accumulator, item) => {
      return accumulator + getFirstAndLastNumbers(item);
    }, 0);
  } catch (e) {
    console.log('Something went wrong', e);
  }
};

const getFirstAndLastNumbers1 = (string) => {
  const chars = string.split('');
  const firstNum = chars.find((value) => !isNaN(value));
  const lastNum = chars.findLast((value) => !isNaN(value));

  return Number(firstNum + lastNum);
}

const getFirstAndLastNumbers = (string) => {
  let firstNumberIndex;
  let lastNumberIndex;
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      firstNumberIndex = i;
      break;
    }
  }
  for (let i = string.length - 1; i >= 0; i--) {
    if (!isNaN(string[i])) {
      lastNumberIndex = i;
      break;
    }
  }
  return Number(string[firstNumberIndex] + string[lastNumberIndex]);
};

(async () => {
  const part1Result = await part1();
  console.log(part1Result);
})();