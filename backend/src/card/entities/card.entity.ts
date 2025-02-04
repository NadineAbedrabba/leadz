import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Prospect } from 'src/prospect/prospect.entity/prospect.entity';
import { Step } from '../../step/entities/step.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nom du prospect (pour affichage)

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => Prospect, (prospect) => prospect.card, { onDelete: 'CASCADE' })
  prospect: Prospect; 

  @OneToMany(() => Step, (step) => step.card, { cascade: true })
  steps: Step[];
}
