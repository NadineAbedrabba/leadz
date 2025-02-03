// src/services/contact.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  createContact(data: Partial<Contact>) {
    console.log(" Données reçues :", data);
    const contact = this.contactRepo.create(data);
    console.log(" Contact créé :", contact);
    return this.contactRepo.save(contact);
  }

  getAllContacts() {
    return this.contactRepo.find();
  }

  async getAllContactsOnly(): Promise<Contact[]> {
    return this.contactRepo.find({
      where: { typeContact: 'contact' }, // Filtrer uniquement les contacts de type 'Contact'
    });
  }

  getContactById(id: number) {
    return this.contactRepo.findOne({ where: { id } });
  }

  async updateContact(id: number, data: Partial<Contact>) {
    await this.contactRepo.update(id, data);
    return this.contactRepo.findOne({ where: { id } });
  }

  deleteContact(id: number) {
    return this.contactRepo.delete(id);
  }
}
