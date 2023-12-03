import resolveDirname from '../utils/resolveDirname.js';
import fetchFileData from '../utils/fetchFileData.js';
import pipe from '../utils/pipe.js';
import path from 'path';

const part1 = async () => {
  try {
    const filePath = path.resolve(resolveDirname(import.meta.url), 'input.txt');
    const data = await fetchFileData(filePath);
    const dataArray = data.trim().split('\n');
  
    return dataArray.reduce((accumulator, item) => {
      return accumulator += pipe(
        replaceWordsWithNums,
        getFirstAndLastNumbers,
      )(item); 
    }, 0);
  } catch (e) {
    console.log('Something went wrong', e);
  }
};

const replaceWordsWithNums = (d) => {
  d = d.replaceAll("one", "o1e");
  d = d.replaceAll("two", "t2o");
  d = d.replaceAll("three", "t3e");
  d = d.replaceAll("four", "f4r");
  d = d.replaceAll("five", "f5e");
  d = d.replaceAll("six", "s6x");
  d = d.replaceAll("seven", "s7n");
  d = d.replaceAll("eight", "e8t");
  d = d.replaceAll("nine", "n9e");
  return d;
};

const getFirstAndLastNumbers = (string) => {
  const chars = string.split('');
  const firstNum = chars.find((value) => !isNaN(value)) || 0;
  const lastNum = chars.findLast((value) => !isNaN(value)) || 0;

  return Number(firstNum + lastNum);
};

(async () => {
  const part1Result = await part1();
  console.log(part1Result);
})();