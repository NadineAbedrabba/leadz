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
  /*async getInterestedProspects() {
    console.log('Fetching interested prospects...');
  
    const prospects = await this.prospectRepo.find({
      where: { etat: 'Intéressé' },
      select: ['id', 'prenom', 'nom', 'email', 'etat'],
    });
  
    console.log('Found prospects:', prospects); // Check what data is retrieved
    return prospects;
  }*/
   /* async getInterestedProspects() {
      const rawQuery = `SELECT * FROM contacts WHERE LOWER(etat) = LOWER('Intéressé');`;
      console.log('Executing query:', rawQuery);
      const result = await this.prospectRepo.query(rawQuery);
      console.log('Raw query result:', JSON.stringify(result, null, 2));
    
      return result;
    }*/
      /*async getInterestedProspects() {
        const prospects = await this.prospectRepo.find({
          where: { etat : 'Intéressé' },
          select: ['id', 'prenom', 'nom', 'email', 'etat'],
        });
        return prospects;
      }*/
      async getInterestedProspects() {
      const prospects = await this.prospectRepo.find({
        where: { etat: 'Intéressé'as any },
        select: ['id', 'prenom', 'nom', 'email', 'etat'],
      });
      
    }
      
      
      
  async updateProspect(id: number, data: Partial<Prospect>) {
    await this.prospectRepo.update(id, data);
    return this.prospectRepo.findOne({ where: { id } });
  }

  deleteProspect(id: number) {
    return this.prospectRepo.delete(id);
  }
}
