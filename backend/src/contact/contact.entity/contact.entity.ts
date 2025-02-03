// src/entities/contact.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, TableInheritance , CreateDateColumn, OneToMany} from 'typeorm';
import { Project } from 'src/project/project.entity/project.entity';

@Entity('contacts')
@TableInheritance({ column: { type: 'varchar', name: 'typeContact' } })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  identifiant: string;

  @Column({ type: 'enum', enum: ['physique', 'moral'] })
  type: 'physique' | 'moral';

  @Column()
  numero: string;

  @Column()
  adresse: string;

  @Column()
  pays: string;

  @Column({ type: 'enum', enum: ['contact', 'prospect', 'client'] })
  typeContact: 'contact' | 'prospect' | 'client';

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Project, (project) => project.contact, { cascade: true, onDelete: 'CASCADE' })
  projets: Project[];
}
