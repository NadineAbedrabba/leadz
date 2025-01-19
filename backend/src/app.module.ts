import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ProspectModule } from './prospect/prospect.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { Contact } from './contact/contact.entity/contact.entity';
import { Prospect } from './prospect/prospect.entity/prospect.entity';
import { Client } from './client/client.entity/client.entity';
import { Project } from './project/project.entity/project.entity';
import { Document } from './document/document.entity/document.entity';
import { CycleModule } from './cycle/cycle.module';
import { DocumentModule } from './document/document.module';
import { DocumentService } from './document/document.service';
import { DocumentRepository } from './document/document.repository';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // ou 'postgres', 'mssql' selon votre SGBD
      host: 'localhost', // adresse de votre serveur de base de données
      port: 3306, // port pour MySQL, à ajuster si nécessaire
      username: 'root', // votre nom d'utilisateur MySQL
      password: 'lavieenrose', // mot de passe de votre base de données
      database: 'leadz', // nom de la base de données
      entities: [Contact, Prospect, Client, Project, Document], // entités à utiliser avec TypeORM
      synchronize: true, // ATTENTION : Ne pas utiliser en production
    }),
    DocumentModule,
    ContactModule,
    ProspectModule,
    ClientModule,
    ProjectModule,
    CycleModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

