// src/services/projet.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity/project.entity';
import { Client } from '../client/client.entity/client.entity';
import { Prospect } from '../prospect/prospect.entity/prospect.entity'
import { ProjetDTO } from './dtos/project.dto';  // Importez le DTO

@Injectable()
export class ProjetService {
  constructor(
    @InjectRepository(Project)
    private readonly projetRepo: Repository<Project>,
    
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Prospect)
    private readonly prospectRepo: Repository<Prospect>,
  ) {}

  // Utilisez ProjetDTO au lieu de Partial<Project> pour le paramètre data
  async createProjet(data: ProjetDTO) {
    let client;
  
    // Si un clientId est passé, récupérer le client
    if (data.clientId) {
      client = await this.clientRepo.findOne({ where: { id: data.clientId } });
      if (!client) {
        throw new Error('Client non trouvé');
      }
    }
  
  
    // Créer le projet
    const projet = this.projetRepo.create({
      ...data,
      client,  // Associer le client si disponible
    });
  
    // Sauvegarder le projet
    await this.projetRepo.save(projet);
  
    // Mise à jour du client si applicable
    if (client) {
      client.nbProjets += 1;
  
      if (client.nbProjets > 1) {
        client.statut = 'Client fidèle';
      }
  
      await this.clientRepo.save(client);
    }
  
    // Retourner le projet créé
    return projet;
  }
  

  getAllProjets() {
    return this.projetRepo.find();
  }

  getProjetById(id: number) {
    return this.projetRepo.findOne({ where: { id } });
  }

  async getProjectsByClientId(clientId: number) {
    return this.projetRepo.find({ where: { client: { id: clientId } }, relations: ['client'] });
  }

  async updateProjet(id: number, data: ProjetDTO) {
    await this.projetRepo.update(id, data);
    return this.projetRepo.findOne({ where: { id } });
  }

  deleteProjet(id: number) {
    return this.projetRepo.delete(id);
  }
}
