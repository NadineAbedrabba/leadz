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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // ou 'postgres', 'mssql' selon votre SGBD
      host: 'localhost', // adresse de votre serveur de base de données
      port: 3306, // port pour MySQL, à ajuster si nécessaire
      username: 'root', // votre nom d'utilisateur MySQL
      password: '', // mot de passe de votre base de données
      database: 'leadz', // nom de la base de données
      entities: [Contact, Prospect, Client, Project], // entités à utiliser avec TypeORM
      synchronize: true, // ATTENTION : Ne pas utiliser en production
    }),
    ContactModule,
    ProspectModule,
    ClientModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

