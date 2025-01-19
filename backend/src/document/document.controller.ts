import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';  // Le service qui gère les documents
import { diskStorage } from 'multer';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // Répertoire de stockage des fichiers
      filename: (req, file, callback) => {
        const fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Vous pouvez ici sauvegarder les informations du document dans la base de données
    const savedDocument = await this.documentService.saveDocument(file);

    return {
      message: 'File uploaded successfully',
      document: savedDocument, // Return the saved document metadata
    };
  }
}

