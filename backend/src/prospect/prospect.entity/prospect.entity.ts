// src/entities/prospect.entity.ts

import { ChildEntity, Column, OneToOne ,OneToMany , JoinColumn } from 'typeorm';
import { Contact } from '../../contact/contact.entity/contact.entity';
import { Project } from '../../project/project.entity/project.entity';
import { Document } from '../../document/document.entity/document.entity';
import { Card } from 'src/card/entities/card.entity';


@ChildEntity()
export class Prospect extends Contact {
  @Column({ type: 'enum', enum: ['Non intéressé', 'Intéressé', 'En négociation'] })
  etat: 'Non intéressé' | 'Intéressé' | 'En négociation';

  @Column({ type: 'datetime', nullable: true })
  dateDerniereInteraction: Date;

  @Column({ nullable: true })
  detailsDerniereInteraction: string;
  @Column({ type: 'float', default: 0 })
  progress: number;

  @OneToMany(() => Document, (document) => document.prospect)
  document: Document[];  // Relation OneToMany avec l'entité Document
  @OneToOne(() => Card, (card) => card.prospect, { cascade: true })
  @JoinColumn()
  card: Card;

}


