import { Coordinates, Polygon } from './types';

export const converter = async (coordinates: Coordinates): Promise<string> => {
   const polygon: Polygon = { type: 'Polygon', coordinates };

   return Promise.resolve(JSON.stringify(polygon));
};
