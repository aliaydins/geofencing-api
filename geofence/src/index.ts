import app from './app/app';
import { port } from './app/config';
import { logger } from './app/logger';

app.listen(port, async () => {
   logger.warn(`server running on port : ${port}`);
}).on('error', (e: any) => console.log(e));
