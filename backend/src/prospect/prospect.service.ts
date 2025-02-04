// src/services/prospect.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prospect } from './prospect.entity/prospect.entity';
import { NotFoundException } from '@nestjs/common';

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
 
  
  async getInterestedProspects() {
    try {
      console.log('Fetching interested prospects...');
      
      const prospects = await this.prospectRepo.find({
        where: { etat: 'Intéressé' },
        select: ['id', 'prenom', 'nom', 'email', 'etat' , 'progress'],
      });
  
      // Mapper les prospects pour ajouter des étapes et des documents à chaque prospect
      const mappedProspects = prospects.map((prospect) => ({
        prospectId: prospect.id,
        name: prospect.nom,
        steps: [
          { name: 'Réunion analyse des besoins', completed: false },
          {
            name: 'Importer documents',
            completed: false,
            documents: [
              { name: 'Proposition commerciale', imported: false },
              { name: 'Devis', imported: false },
            ],
          },
          { name: 'Réunion de cadrage', completed: false },
          {
            name: 'Importer documents',
            completed: false,
            documents: [
              { name: 'Contrat', imported: false },
              { name: 'CDC', imported: false },
            ],
          },
          { name: 'Validation contrat et CDC', completed: false, type: 'validation' },
        ],
        status: 'pending',
        progress: prospect.progress || 0,
      }));
  
      console.log('Fetched interested prospects:', mappedProspects); // Log the results
      return mappedProspects;
    } catch (error) {
      console.error('Error fetching interested prospects:', error);
      throw error;
    }
  }
  
  
      
      
      
  async updateProspect(id: number, data: Partial<Prospect>) {
    await this.prospectRepo.update(id, data);
    return this.prospectRepo.findOne({ where: { id } });
  }

  deleteProspect(id: number) {
    return this.prospectRepo.delete(id);
  }
 
  async updateProgress(id: number, progress: number) {
    console.log(`Updating progress for prospect with ID: ${id}`);
  console.log(`New progress value: ${progress}`);
    // Utilise l'objet de recherche correctement dans findOne
    const prospect = await this.prospectRepo.findOne({ where: { id } });
    console.log('Prospect found:', prospect);
    if (!prospect) {
      throw new Error('Prospect non trouvé');
    }

    // Mise à jour de la progression
    prospect.progress = progress;
    console.log('Updated prospect progress:', prospect.progress);

    // Sauvegarde de l'objet modifié dans la base de données
    await this.prospectRepo.save(prospect);
    console.log('Prospect saved successfully with updated progress:', prospect);

    return prospect;
  }
  
}
