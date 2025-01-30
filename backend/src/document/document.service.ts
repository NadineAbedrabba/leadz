import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../document/document.entity/document.entity';
import { Prospect } from '../prospect/prospect.entity/prospect.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>, // Injecting Document repository

    @InjectRepository(Prospect)
    private readonly prospectRepository: Repository<Prospect> // Injecting Prospect repository for validation
  ) {}

  async saveDocument(
    file: Express.Multer.File,
    prospectId: number,
    projet: string,
    status: string,
    typeDocument: string
  ) {
    // Check if the Prospect exists
    const prospect = await this.prospectRepository.findOne({ where: { id: prospectId } });
    if (!prospect) {
      throw new NotFoundException(`Prospect with ID ${prospectId} not found`);
    }

    // Create a new Document entity with dynamic values
    const document = this.documentRepository.create({
      documentNom: file.filename, // The actual file name
      projet,                     // Provided project
      status,                     // Dynamic status
      typeDocument,               // Provided document type
      prospect,                   // Link the document to the existing prospect
    });

    // Save the document to the database
    return await this.documentRepository.save(document);
  }
}
