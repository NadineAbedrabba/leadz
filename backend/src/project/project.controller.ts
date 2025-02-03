/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get('client/:contactId')
  getProjectsByContactId(@Param('contactId') contactId: number) {
    return this.projetService.getProjectsByContactId(contactId);
  }

  @Put(':id')
  updateProjet(@Param('id') id: number, @Body() projetData: ProjetDTO) {
    return this.projetService.updateProjet(id, projetData);
  }

  @Delete(':id')
  deleteProjet(@Param('id') id: number) {
    return this.projetService.deleteProjet(id);
  }
    @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retourne un code 204 si la suppression réussit
  async deleteProject(@Param('id') projectId: number): Promise<void> {
    await this.projetService.deleteProjet(projectId);
  }
}

