import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjetService } from './project.service';
import { ProjetDTO } from './dtos/project.dto';  // Assurez-vous d'importer le DTO

@Controller('projets')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Post()
  createProjet(@Body() projetData: ProjetDTO) {
    return this.projetService.createProjet(projetData);
  }

  @Get()
  getAllProjets() {
    return this.projetService.getAllProjets();
  }

  @Get(':id')
  getProjetById(@Param('id') id: number) {
    return this.projetService.getProjetById(id);
  }

  @Get('client/:clientId')
  getProjectsByClientId(@Param('clientId') clientId: number) {
    return this.projetService.getProjectsByClientId(clientId);
  }

  @Put(':id')
  updateProjet(@Param('id') id: number, @Body() projetData: ProjetDTO) {
    return this.projetService.updateProjet(id, projetData);
  }

  @Delete(':id')
  deleteProjet(@Param('id') id: number) {
    return this.projetService.deleteProjet(id);
  }
}

