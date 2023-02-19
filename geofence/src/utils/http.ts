import axios, { AxiosResponse } from 'axios';

type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

interface RequestSettings<R> {
   path: string;
   method: Methods;
   body?: R;
}

class http {
   request<R>(config: RequestSettings<R>): Promise<void> {
      return new Promise((resolve, reject) => {
         axios({
            method: config.method,
            url: config.path,
            data: config.body,
            headers: { 'Content-Type': 'text/plain' },
         })
            .then((r: AxiosResponse) => {
               resolve(r as any);
            })
            .catch((e: any) => {
               reject(e.response);
            });
      });
   }
}

export default new http();
