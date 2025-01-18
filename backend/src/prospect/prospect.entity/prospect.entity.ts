// src/entities/prospect.entity.ts

import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Contact } from '../../contact/contact.entity/contact.entity';
import { Project } from '../../project/project.entity/project.entity';

@ChildEntity()
export class Prospect extends Contact {
  @Column({ type: 'enum', enum: ['Non intéressé', 'Intéressé', 'En négociation'] })
  etat: 'Non intéressé' | 'Intéressé' | 'En négociation';

  @Column({ type: 'datetime', nullable: true })
  dateDerniereInteraction: Date;

  @Column({ nullable: true })
  detailsDerniereInteraction: string;
}


