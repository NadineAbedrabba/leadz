/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, } from '@nestjs/config';


import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRoot(
 {
 type: 'mysql',
 host: 'localhost',
 port: 3306,
 username: 'root',
 password: '',
 database: 'leadz',
 entities: [],
 synchronize: true,
 }
 )
  ],
  controllers: [AppController],
  providers: [AppService],
}
)

export class AppModule {
  
}
