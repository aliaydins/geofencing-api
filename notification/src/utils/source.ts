import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { db } from '../app/config';
import { Event } from '../db/model/Event';
import { migrationOne } from '../db/migration/migrationOne';

export const dbSource = new DataSource({
   name: 'default',
   host: db.host,
   port: parseInt(db.port),
   username: db.user,
   password: db.password,
   database: db.name,
   schema: db.schema,
   type: 'postgres',
   synchronize: process.argv[1].split('/')?.find((piece: string) => piece === 'build') ? false : true,
   logging: false,
   entities: [Event],
   migrations: [migrationOne],
});
