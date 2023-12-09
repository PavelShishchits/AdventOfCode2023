import resolveDirname from '../utils/resolveDirname.js';
import fetchFileData from '../utils/fetchFileData.js';
import path from 'path';

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const challange = async (fileName) => {
  const filePath = path.resolve(resolveDirname(import.meta.url), fileName);
  const data = await fetchFileData(filePath);
  const parsedData = parseInputData(data);
  
  return {
    part1: calcGamesIdSums(filterGamesByLimits(parsedData, limits)),
    part2: findGamesPower(parsedData),
  };
};

const parseInputData = (data) => {
  const dataArray = data.trim().split('\n');
  return dataArray.reduce((acc, line) => {
    const [rawGameId, rawGameSets] = line.split(':');
    return {
      ...acc,
      [parseGameId(rawGameId)]: parseGameSets(rawGameSets)
    };
  }, {});
};

const findGamesPower = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    const game = data[key];
    const { red, green, blue } = findFewestNumberOfCubes(game);
    const gamePower = red * green * blue;
    return acc + gamePower;
  }, 0);     
};

const findFewestNumberOfCubes = (game) => {
  return {
    red: Math.max(...game.map((item) => item.red)),
    green: Math.max(...game.map((item) => item.green)),
    blue: Math.max(...game.map((item) => item.blue)),
  }
};
const filterGamesByLimits = (data, limits) => {
  return Object.keys(data).filter((key) => {
    const game = data[key];
    return game.every((game) => game.red <= limits.red && game.green <= limits.green && game.blue <= limits.blue)
  });
};

const calcGamesIdSums = (gamesIds) => {
  return gamesIds.reduce((acc, id) => {
    return acc + Number(id);
  }, 0);
}

const parseGameId = (string) => {
  return Number(string.trim().split(' ')[1]);
};

const parseGameSets = (string) => {
  return string.trim().split(';').map((set) => parseGameSet(set));
};

const parseGameSet = (string) => {
  return string.trim().split(',').reduce((acc, item) => {
    const [quant, color] = item.trim().split(' ');
    const parsedColor = color.trim().toLowerCase();
    const parsedQuant = Number(quant.trim());
    return {
      ...acc,
      [parsedColor]: acc[parsedColor] += parsedQuant,
    }
  }, {
    red: 0,
    green: 0,
    blue: 0,
  });
};

const getGameSum = (game) => {
  return game.reduce((acc, gameSet) => {
    return {
      red: acc.red + gameSet.red,
      green: acc.green + gameSet.green,
      blue: acc.blue + gameSet.blue,
    }
  }, {
    red: 0,
    green: 0,
    blue: 0,
  });
};

(async () => {
  const { part1, part2 } = await challange('input.txt');
  console.log(part1, part2);
})();