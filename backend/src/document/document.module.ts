/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity/document.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { ProspectModule } from '../prospect/prospect.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]),
  ProspectModule,],  // No need for DocumentRepository
  providers: [DocumentService],
  exports: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}

