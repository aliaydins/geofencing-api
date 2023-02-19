import { dbSource } from '../../utils/source';
import { Event } from '../model/Event';

const eventRepository = dbSource.getRepository(Event);

export class repository {
   static save = async (e: Event): Promise<Event | null> => {
      return eventRepository.save(e);
   };

   static find = async (): Promise<Event[] | null> => {
      return eventRepository.find();
   };
}
