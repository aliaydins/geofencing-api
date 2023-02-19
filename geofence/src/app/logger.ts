const ERROR = '\x1b[31m%s\x1b[0m'; //red
const WARN = '\x1b[33m%s\x1b[0m'; //yellow
const INFO = '\x1b[36m%s\x1b[0m'; //cyan
const SUCCESS = '\x1b[32m%s\x1b[0m'; //green

export const logger = class {
   static error(message: string) {
      console.error(ERROR, `${getDate()} ${message}`);
   }
   static warn(message: string) {
      console.warn(WARN, `${getDate()} ${message}`);
   }

   static info(message: string) {
      console.warn(INFO, `${getDate()} ${message}`);
   }
   static success(message: string) {
      console.info(SUCCESS, `${getDate()} ${message}`);
   }
};

const getDate = (): string => {
   var r = '';
   var d = new Date();

   r +=
      d.getFullYear() +
      '-' +
      String(d.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getDate()).padStart(2, '0') +
      ' ' +
      String(d.getHours()).padStart(2, '0') +
      ':' +
      String(d.getMinutes()).padStart(2, '0') +
      ':' +
      String(d.getSeconds()).padStart(2, '0');

   return r;
};
