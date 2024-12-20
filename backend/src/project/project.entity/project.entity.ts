// src/entities/projet.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../client/client.entity/client.entity';
import { Prospect } from '../../prospect/prospect.entity/prospect.entity';

@Entity('projets')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomProjet: string;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  dateCreation: Date;

  @Column({ type: 'enum', enum: ['en cours', 'terminé', 'annulé'] })
  statutProjet: 'en cours' | 'terminé' | 'annulé';

  @ManyToOne(() => Client, (client) => client.projets, { nullable: true })
  client: Client;
}

