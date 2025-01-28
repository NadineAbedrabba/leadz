// src/entities/client.entity.ts

import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Contact } from '../../contact/contact.entity/contact.entity';
import { Project } from '../../project/project.entity/project.entity';

@ChildEntity()
export class Client extends Contact {
  @Column({ type: 'enum', enum: ['Client', 'Client fidèle'], default: 'Client' })
  statut: 'Client' | 'Client fidèle';

  @Column({ default: 0 })
  nbProjets: number;

  @Column({ type: 'datetime', nullable: true })
  dateDerniereInteraction: Date;

  @Column({ nullable: true })
  detailsDerniereInteraction: string;
}
