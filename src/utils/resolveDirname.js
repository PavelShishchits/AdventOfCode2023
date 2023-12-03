import { fileURLToPath } from 'url';
import path from 'path';

const resolveDirname = (pathUrl) => {
  const __dirname = path.dirname(fileURLToPath(pathUrl));
  return __dirname;
} 

export default resolveDirname;