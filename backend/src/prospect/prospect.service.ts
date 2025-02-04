// src/services/prospect.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prospect } from './prospect.entity/prospect.entity';

@Injectable()
export class ProspectService {
  constructor(
    @InjectRepository(Prospect)
    private readonly prospectRepo: Repository<Prospect>,
  ) {}

  createProspect(data: Partial<Prospect>) {
    const prospect = this.prospectRepo.create(data);
    return this.prospectRepo.save(prospect);
  }

  getAllProspects() {
    return this.prospectRepo.find();
  }

  getProspectById(id: number) {
    return this.prospectRepo.findOne({ where: { id } });
  }

  async updateProspect(id: number, data: Partial<Prospect>) {
    await this.prospectRepo.update(id, data);
    return this.prospectRepo.findOne({ where: { id } });
  }

  deleteProspect(id: number) {
    return this.prospectRepo.delete(id);
  }
}
