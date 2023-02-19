export type Health = {
   name: string;
   status: 'UP' | 'DOWN';
};

export enum Detect {
   ENTER = 'enter',
   EXIT = 'exit',
   INSIDE = 'inside',
   OUTSIDE = 'outside',
   CROSSES = 'crosses',
}

export enum Status {
   SENT = 'sent',
   FAILED = 'failed',
}

export type HookEvent = {
   command: string;
   group: string;
   detect: Detect;
   meta?: { id: string; type: string };
   hook: string;
   key: string;
   time: string | Date;
   id: string;
   object: { type: 'Point'; coordinates: number[] };
};
