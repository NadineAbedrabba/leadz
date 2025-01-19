import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { Document } from '../document/document.entity/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private documentRepository: DocumentRepository,  // Inject the repository
  ) {}

  async saveDocument(file: Express.Multer.File) {
    const document = new Document();
    document.documentNom = file.filename;  // Nom du fichier
    document.projet = 'Nom du projet';  // À ajuster selon vos besoins
    document.status = 'En cours';  // Exemple de status
    document.typeDocument = 'PDF';  // Exemple de type
    document.contactId = 123;  // Exemple de contact ID

    // Sauvegarde du document dans la base de données
    return this.documentRepository.save(document);
  }
}

