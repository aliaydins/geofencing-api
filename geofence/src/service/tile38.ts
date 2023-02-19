import { tile38Host, tile38Port } from '../app/config';
import { ResponseCustom } from '../utils/types';
import { logger } from '../app/logger';
import http from '../utils/http';

export const tile38Service = async (body: string): Promise<ResponseCustom> => {
   let r: any;
   try {
      r = await http.request({
         path: `${tile38Host}:${tile38Port}`,
         method: 'GET',
         body: body,
      });
   } catch (err: any) {
      logger.error(`tile38Service Error:` + (err?.message || err?.data || ''));
      r = { data: err?.data || `tile38Service Error:`, status: err?.status || 400 };
   }

   return Promise.resolve({ data: r.data, status_code: r.status });
};
