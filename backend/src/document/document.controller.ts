/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors, Body, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { memoryStorage } from 'multer'; 

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // Route de test pour vérifier si le contrôleur fonctionne
  @Get('test')
  testRoute() {
    return { message: 'DocumentController is working!' };
  } 
   
  @Get('documents')
  async findAll() {
    return this.documentService.findAll(); 
  }

  @Post('upload/:prospectId')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),  
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('prospectId') prospectId: number,
    @Body() body: { projet: string; status: string; typeDocument: string; natureDocument: 'Propal' | 'Devis' | 'Contrat' | 'Cahier de charge' }  // Ajout du paramètre natureDocument
  ) {
    try {
      
      if (!file) {
        return { message: 'Aucun fichier envoyé', error: 'File not found' };
      }

      
      if (!body.natureDocument) {
        return { message: 'Nature du document est requise', error: 'NatureDocument not provided' };
      }

      
      const savedDocument = await this.documentService.saveDocument(
        file, 
        prospectId, 
        body.projet, 
        body.status, 
        body.typeDocument,
        body.natureDocument
      );

      return {
        message: 'File uploaded successfully',
        document: savedDocument, 
      };
    } catch (error) {
      return {
        message: 'File upload failed',
        error: error.message,
      };
    }
  }
}
