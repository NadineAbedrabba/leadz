import { Module } from '@nestjs/common';
import { ProjetController } from './project.controller';
import { ProjetService } from './project.service';
import { Project } from './project.entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/client.entity/client.entity';
import { Prospect } from '../prospect/prospect.entity/prospect.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Project, Client, Prospect])],
  controllers: [ProjetController],
  providers: [ProjetService]
})
export class ProjectModule {}
