import { Detect, HookEvent, Status } from '../utils/types';
import { repository } from '../db/repository/repository';
import { Event } from '../db/model/Event';
import { logger } from '../app/logger';

export class eventService {
   static enter = async (id: string, event: HookEvent): Promise<boolean> => {
      try {
         logger.info(`sent notification to user -> ${id}`);
         await repository.save({ user_id: id, status: Status.SENT, detect: Detect.ENTER, event, message: 'enter notification sent' } as Event);
         return true;
      } catch (err) {
         logger.error(`sent notification to user -> ${id}`);
         await repository.save({ user_id: id, status: Status.FAILED, detect: Detect.ENTER, event, message: 'enter notification failed' } as Event);
         return false;
      }
   };

   static exit = async (id: string, event: HookEvent): Promise<boolean> => {
      try {
         logger.info(`sent notification to user -> ${id}`);
         await repository.save({ user_id: id, status: Status.SENT, detect: Detect.EXIT, event, message: 'exit notification sent' } as Event);
         return true;
      } catch (err) {
         logger.error(`sent notification to user -> ${id}`);
         await repository.save({ user_id: id, status: Status.FAILED, detect: Detect.EXIT, event, message: 'exit notification failed' } as Event);
         return false;
      }
   };
}
