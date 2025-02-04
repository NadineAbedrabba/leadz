import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Project } from './project/project.entity/project.entity';
import { Contact } from './contact/contact.entity/contact.entity';
import { Prospect } from './prospect/prospect.entity/prospect.entity';
import { Client } from './client/client.entity/client.entity';
import { ContactModule } from './contact/contact.module';
import { ProspectModule } from './prospect/prospect.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { StepModule } from './step/step.module';
import { DocumentModule } from './document/document.module';
import { CycleModule } from './cycle/cycle.module';
import { CardModule } from './card/card.module';
import { Document } from './document/document.entity/document.entity';
import { Step } from './step/entities/step.entity';
import { Card } from './card/entities/card.entity';

@Module({
  imports: [
    // Chargeement des variables d'env
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // Config TypeORM 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity,Contact, Prospect, Client, Project, Document,Step,Card],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ContactModule,
    ProspectModule,
    ClientModule,
    ProjectModule,
    StepModule,
    DocumentModule,
    CycleModule,
    CardModule,

  ],
})
export class AppModule {}
