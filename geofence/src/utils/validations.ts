import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, ValidationError, body } from 'express-validator';
import { Coordinates, PointV } from './types';

export default (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
   try {
      await Promise.all(validations.map((validation) => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const messageArray: ValidationError[] = errors.array();
         next(res.status(400).json({ message: messageArray[0].msg.replace(/['"]+/g, '') }));
      }
      return next();
   } catch (error) {
      next(error);
   }
};

export const setGeofencingValidation = [
   body('name').exists().withMessage('name field is required'),
   body('name')
      .isString()
      .withMessage('name must be a string value')
      .trim()
      .not()
      .isEmpty()
      .optional({ nullable: false })
      .withMessage('name field not be empty string'),
   body('coordinates').exists().withMessage('coordinates field is required'),
   body('coordinates').isArray().optional({ nullable: false }).withMessage('coordinates field must be array'),
   body('coordinates')
      .optional({ nullable: false })
      .custom((value: Coordinates) => {
         if (!value.length || !value[0].length) throw new Error('coordinates arrays not be empty');
         if (value[0].length < 4) throw new Error('coordinates includes least four coordinate');
         value[0].forEach((val: any[], i: number) => {
            if (val.length !== 2 || typeof val[0] !== 'number' || typeof val[1] !== 'number') {
               throw new Error('coordinates validation error');
            }
         });
         const first = value[0][0];
         const last = value[0][value[0]?.length - 1];

         first?.forEach((val: any, i: number) => {
            if (first[i] !== last[i]) throw new Error('first and last coordinates must same on polygon ');
         });

         return true;
      }),
];

export const setUserValidation = [
   body('id').exists().withMessage('id field is required'),
   body('point').exists().withMessage('point field is required'),
   body('point').isObject().optional({ nullable: false }).withMessage('point field not be empty string'),
   body('point')
      .optional({ nullable: false })
      .custom((value: PointV) => {
         const { latitude, longitude } = value;

         if (!latitude || !longitude) throw new Error('latitude or longitude not field is required');

         if (typeof latitude !== 'number' || typeof longitude !== 'number') throw new Error('latitude or longitude field must be a number');
         return true;
      }),
];
