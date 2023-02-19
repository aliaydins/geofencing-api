import { Detect, Status } from '../../utils/types';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('event')
export class Event extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   user_id: string;

   @Column({ type: 'enum', enum: Status })
   status: Status;

   @Column({ type: 'enum', enum: Detect })
   detect: Detect;

   @Column()
   message: string;

   @Column('jsonb')
   event: object;

   constructor(data?: any) {
      super();
      if (data) {
         this.user_id = data.user_id;
         this.status = data.status;
         this.detect = data.detect;
         this.message = data.message;
         this.event = data.event;
      }
   }
}
