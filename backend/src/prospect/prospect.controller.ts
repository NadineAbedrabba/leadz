// src/controllers/prospect.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProspectService } from './prospect.service';
import { ProspectDTO } from './dtos/prospect.dto';

@Controller('prospects')
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Post()
  createProspect(@Body() prospectData: ProspectDTO) {
    const { createdAt, ...dataWithoutCreatedAt } = prospectData;
    return this.prospectService.createProspect(dataWithoutCreatedAt);
  } 
   

  @Get()
  getAllProspects() {
    return this.prospectService.getAllProspects();
  }

  @Get(':id')
  getProspectById(@Param('id') id: number) {
    return this.prospectService.getProspectById(id);
  }
  @Get('interested')
  async getInterestedProspects() {
    return this.prospectService.getInterestedProspects();
  }
   

  @Put(':id')
  updateProspect(@Param('id') id: number, @Body() prospectData: ProspectDTO) {
    const { createdAt, ...updatableData } = prospectData;
    return this.prospectService.updateProspect(id, updatableData);
  }

  @Delete(':id')
  deleteProspect(@Param('id') id: number) {
    return this.prospectService.deleteProspect(id);
  }
}

