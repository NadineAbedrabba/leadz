// src/controllers/prospect.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param , Patch } from '@nestjs/common';
import { ProspectService } from './prospect.service';
import { ProspectDTO } from './dtos/prospect.dto';

@Controller('prospects')
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}
  @Get('test')
async testRoute() {
  console.log('Test route hit!');
  return 'Test route working!';
}

  @Get('interested')
  async getInterestedProspects() {
    console.log('GET /prospects/interested hit!');
    return this.prospectService.getInterestedProspects();
  }

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
  
 
   

  @Put(':id')
  updateProspect(@Param('id') id: number, @Body() prospectData: ProspectDTO) {
    const { createdAt, ...updatableData } = prospectData;
    return this.prospectService.updateProspect(id, updatableData);
  }

  @Delete(':id')
  deleteProspect(@Param('id') id: number) {

    return this.prospectService.deleteProspect(id);
  }
 
  @Put(':id/progress')
  async updateProgress(
    @Param('id') id: number,
    @Body() body: { progress: number }
  ) {
    console.log('Received body:', body);  // Log the entire body to check if progress is received
    const { progress } = body;
    console.log('Progress value:', progress); // Log the progress value directly
    const updatedProspect = await this.prospectService.updateProgress(id, progress);
    return updatedProspect;
  }
}

