// src/controllers/contact.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDTO } from './dtos/contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  createContact(@Body() contactData: ContactDTO) {
    const { createdAt, ...dataWithoutCreatedAt } = contactData;

    // Appeler le service avec des données sans `createdAt`
    return this.contactService.createContact(dataWithoutCreatedAt);
  }

  @Get('contacts')
  async getAllContactsOnly() {
    return this.contactService.getAllContactsOnly();
  }


  @Get()
  getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  getContactById(@Param('id') id: number) {
    return this.contactService.getContactById(id);
  }

  @Put(':id')
async updateContact(@Param('id') id: number, @Body() contactData: ContactDTO) {
  // Supprimer `createdAt` pour éviter les conflits
  const { createdAt, ...updatableData } = contactData;

  return this.contactService.updateContact(id, updatableData);
}

  @Delete(':id')
  deleteContact(@Param('id') id: number) {
    return this.contactService.deleteContact(id);
  }
}
