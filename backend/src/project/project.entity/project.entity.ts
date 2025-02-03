// src/entities/projet.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from 'src/contact/contact.entity/contact.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomProjet: string;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  dateCreation: Date | null;

  @Column({ type: 'enum', enum: ['non décroché', 'décroché', 'en cours de négociation', 'terminé', 'résilié'] })
  statutProjet: 'non décroché'| 'décroché'| 'en cours de négociation'| 'terminé'| 'résilié';

  @ManyToOne(() => Contact, (contact) => contact.projets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contactId' })
  contact: Contact;
}
