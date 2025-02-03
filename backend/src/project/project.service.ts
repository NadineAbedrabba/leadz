/* eslint-disable prettier/prettier */
// src/services/projet.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity/project.entity';
import { Client } from '../client/client.entity/client.entity';
import { Contact } from 'src/contact/contact.entity/contact.entity';
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

    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,  // Utiliser le type correct pour Contact
  ) {}

  async createProjet(data: ProjetDTO) {
    let client;
    let contact;

    // Si un contactId est passé, récupérer le contact et le client si nécessaire
    if (data.contactId) {
      contact = await this.contactRepo.findOne({ where: { id: data.contactId } });

      if (!contact) {
        throw new Error('Contact not found');
      }

      // Si vous souhaitez également récupérer le client associé au contact, vous pouvez l'ajouter ici
      client = await this.clientRepo.findOne({ where: { id: contact.id } });
    }

    // Créer le projet et associer le contact
    const projet = this.projetRepo.create({
      ...data,
      contact,  // Associez le contact ici
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

  // Méthode pour récupérer tous les projets
  getAllProjets() {
    return this.projetRepo.find({ relations: ['contact'] });  // Chargez aussi la relation contact
  }

  // Méthode pour récupérer un projet par son ID
  async getProjetById(id: number) {
    const projet = await this.projetRepo.findOne({ 
      where: { id },
    });

    if (!projet) {
      throw new Error('Project not found');
    }

    return projet;
  }

  // Méthode pour récupérer les projets par clientId
  async getProjectsByContactId(contactId: number) {
    return this.projetRepo.find({ 
      where: { contact: { id: contactId } },
      relations: ['contact'],
    });
  }

  // Méthode pour mettre à jour un projet
  async updateProjet(id: number, data: ProjetDTO) {
    await this.projetRepo.update(id, data);
    return this.projetRepo.findOne({ where: { id } });
  }

  // Méthode pour supprimer un projet
  deleteProjet(id: number) {
    return this.projetRepo.delete(id);
  }
  
}
