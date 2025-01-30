import { Controller, Post, UploadedFile, UseInterceptors, Body, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';  
import { diskStorage } from 'multer';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  
   // Test route to check if the controller is working
   @Get('test')
   testRoute() {
     return { message: 'DocumentController is working!' };
   }
  @Post('upload/:prospectId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // Répertoire de stockage des fichiers
      filename: (req, file, callback) => {
        const fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
      },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('prospectId') prospectId: number,
    @Body() body: { projet: string; status: string; typeDocument: string }
  ) {
    try{
       // Appel du service avec les paramètres dynamiques
    const savedDocument = await this.documentService.saveDocument(
      file, 
      prospectId, 
      body.projet, 
      body.status, 
      body.typeDocument
    );

    return {
      message: 'File uploaded successfully',
      document: savedDocument, // Retourne les métadonnées du document enregistré
    };
    } catch (error) {
      return {
        message: 'File upload failed',
        error: error.message,
      };
    }
   
  }
}
