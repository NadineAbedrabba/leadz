/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../document/document.entity/document.entity';
import { Prospect } from '../prospect/prospect.entity/prospect.entity';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,

    @InjectRepository(Prospect)
    private readonly prospectRepository: Repository<Prospect> 
  ) {}

  async findAll(): Promise<Document[]> {
  return this.documentRepository.find();
}
  async saveDocument(
    file: Express.Multer.File,
    prospectId: number,
    projet: string,
    status: string,
    typeDocument: string,
    natureDocument: 'Propal' | 'Devis' | 'Contrat' | 'Cahier de charge' 
  ) {
    // Vérifier si le prospect existe
    const prospect = await this.prospectRepository.findOne({ where: { id: prospectId } });
    if (!prospect) {
      throw new NotFoundException(`Prospect avec l'ID ${prospectId} introuvable`);
    }

    // Lire le contenu du fichier
    let fileContent: string | null = null;

    if (!file) {
      throw new BadRequestException('Aucun fichier envoyé');
    }

    try {
      if (file.mimetype === 'text/plain') {
       
        
        
        console.log(file);
        console.log('File content (raw) 1:', file.buffer);
        fileContent = file.buffer.toString('utf-8');
        console.log('File content (utf-8) 2:', fileContent);
        
      } else if (file.mimetype === 'application/pdf') {
        if (!Buffer.isBuffer(file.buffer)) {
          throw new BadRequestException('Le fichier n\'est pas un Buffer valide');
        }
        const pdfData = await pdfParse(file.buffer); 
        fileContent = pdfData.text;
      } else {
        throw new BadRequestException('Type de fichier non supporté');
      }
    } catch (error) {
      throw new BadRequestException('Erreur lors de la lecture du fichier : ' + error.message);
    }

    // Sauvegarder le document dans la base de données
    const document = this.documentRepository.create({
      documentNom: file.originalname, 
      projet,
      status,
      typeDocument,
      prospect,
      natureDocument, 
      contenu: fileContent,
    });

    await this.documentRepository.save(document);

    return { message: 'Document enregistré avec succès', document };
  }
}
