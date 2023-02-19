import { Request, Response } from 'express';
import { Detect, Health, HookEvent } from '../utils/types';
import { logger } from '../app/logger';
import { dbSource } from '../utils/source';
import { eventService } from '../service/eventService';
import { repository } from '../db/repository/repository';

export const healthCheck = async (req: Request, res: Response): Promise<any> => {
   try {
      let health: Array<Health> = [
         { name: 'notification-service', status: 'UP' },
         { name: 'postgre', status: dbSource.isInitialized ? 'UP' : 'DOWN' },
      ];
      return res.status(200).json(health);
   } catch (err: any) {
      logger.error(`Error occured while health checking Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
   }
};

export const eventHandler = async (req: Request, res: Response): Promise<any> => {
   try {
      const event: HookEvent = req.body;
      const { id, detect, key, hook } = event;

      logger.warn(`event handle with hook -> ${hook} key ->${key} detect type -> ${detect} id -> ${id}`);

      switch (detect) {
         case Detect.ENTER: {
            return res.status((await eventService.enter(id, event)) ? 200 : 400).json('');
         }
         case Detect.EXIT: {
            return res.status((await eventService.exit(id, event)) ? 200 : 400).json('');
         }
         default: {
            return res.status(200).json('');
         }
      }
   } catch (err: any) {
      logger.error(`Event Handler error:` + err?.message || err?.data);
      return res.status(400).json({ message: `Event Handler error:` + err?.message || err?.data });
   }
};

export const getAll = async (req: Request, res: Response): Promise<any> => {
   try {
      res.status(200).json(await repository.find());
   } catch (err: any) {
      logger.error(`Get All error:` + err?.message || err?.data);
      return res.status(400).json({ message: `Get All error:` + err?.message || err?.data });
   }
};
