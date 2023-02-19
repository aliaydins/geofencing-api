import { Request, Response } from 'express';
import { logger } from '../app/logger';
import { Health } from '../utils/types';
import { tile38Service } from '../service/tile38';
import { city, notificationUrl } from '../app/config';
import { converter } from '../utils/converter';

export const healthCheck = async (req: Request, res: Response): Promise<any> => {
   try {
      let health: Array<Health> = [
         { name: 'geofence-service', status: 'UP' },
         { name: 'tile38-server', status: 'DOWN' },
      ];

      const { status_code } = await tile38Service('ping');

      if (status_code === 200)
         health = health.filter((h: Health): Health => {
            if (h.name === 'tile38-server') h.status = 'UP';
            return h;
         });

      return res.status(200).json(health);
   } catch (err: any) {
      logger.error(`Error occured while health checking Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
   }
};

export const setGeofencing = async (req: Request, res: Response): Promise<any> => {
   try {
      const { name, coordinates } = req.body;

      const polygon = await converter(coordinates);

      const { data, status_code } = await tile38Service(
         `SETHOOK ${name} ${notificationUrl} WITHIN ${city} FENCE DETECT enter,exit OBJECT ${polygon} `,
      );

      return res.status(status_code).json({ message: data?.err || 'geofencing hook created successfully', status: data?.ok });
   } catch (err: any) {
      logger.error(`setGeofencing Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `setGeofencing Error occured:` + err?.message || err?.data });
   }
};

export const setUser = async (req: Request, res: Response): Promise<any> => {
   try {
      const { id, point } = req.body;

      const { data, status_code } = await tile38Service(`SET ${city} ${id} POINT ${point.latitude} ${point.longitude}`);

      return res.status(status_code).json({ message: data?.err || 'user points saved successfully', status: data?.ok });
   } catch (err: any) {
      logger.error(`setUser Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `setUser Error occured:` + err?.message || err?.data });
   }
};
