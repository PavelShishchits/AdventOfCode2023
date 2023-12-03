import { promises as fs } from 'fs';

const fetchFileData = async (filePath) => { 
  const data = await fs.readFile(filePath, 'utf8');
  return data;
}

export default fetchFileData;