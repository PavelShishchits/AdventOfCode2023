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
  const validGames = filterGamesByLimits(parsedData);

  return calcGamesIdSums(validGames);
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

const filterGamesByLimits = (data) => {
  return Object.keys(data).filter((key) => {
    const games = data[key];
    return games.every((game) => game.red <= limits.red && game.green <= limits.green && game.blue <= limits.blue)
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
  const result = await challange('input.txt');
  console.log(result);
})();