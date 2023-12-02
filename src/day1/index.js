import { promises as fs } from 'fs';
import path from 'path';

async function fetchData() {
  try {
    // toDo use absolute path to run code from any directory + move file to utils
    const filePath = path.resolve('input.txt');
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

const day1 = async () => {
  try {
    const data = await fetchData();
    const dataArray = data.split('\n');
  
    return dataArray.reduce((accumulator, item) => {
      return accumulator += getFirstAndLastNumbers(item);
    }, 0);
  } catch (e) {
    console.log('Something went wrong');
  }
};

// toDo get number with single loop
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
  const result = await day1();
  console.log(result);
})();