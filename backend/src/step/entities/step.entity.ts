import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { Document } from 'src/document/document.entity/document.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;
  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => Card, (card) => card.steps, { onDelete: 'CASCADE' })
  card: Card;


}
