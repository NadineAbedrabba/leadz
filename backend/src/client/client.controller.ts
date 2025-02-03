// src/controllers/client.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './dtos/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClient(@Body() clientData: ClientDTO) {
    const { createdAt, ...updatableData } = clientData;
    return this.clientService.createClient(updatableData);
  }

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }

  @Put(':id')
  updateClient(@Param('id') id: number, @Body() clientData: ClientDTO) {
    const { createdAt, ...updatableData } = clientData;
    return this.clientService.updateClient(id, updatableData);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
