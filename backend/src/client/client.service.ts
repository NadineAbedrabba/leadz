// src/services/client.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  createClient(data: Partial<Client>) {
    const client = this.clientRepo.create(data);
    return this.clientRepo.save(client);
  }

  getAllClients() {
    return this.clientRepo.find();
  }

  getClientById(id: number) {
    return this.clientRepo.findOne({ where: { id } });
  }

  async updateClient(id: number, data: Partial<Client>) {
    await this.clientRepo.update(id, data);
    return this.clientRepo.findOne({ where: { id } });
  }

  deleteClient(id: number) {
    return this.clientRepo.delete(id);
  }
}

