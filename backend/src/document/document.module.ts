import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity/document.entity';
import { DocumentRepository } from './document.repository';

import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
imports: [TypeOrmModule.forFeature([Document, DocumentRepository])], 
  providers: [DocumentService],
  exports: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule {}
