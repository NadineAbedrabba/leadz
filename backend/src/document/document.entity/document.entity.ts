import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prospect } from '../../prospect/prospect.entity/prospect.entity';
import { Step } from 'src/step/entities/step.entity';
import { Card } from 'src/card/entities/card.entity';
@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  projet: string;

  @Column()
  status: string;

  @Column()
  documentNom: string;

  @Column()
  typeDocument: string;

  @Column({ type: 'text', nullable: true }) 
  contenu: string;

  @Column({ type: 'enum', enum: ['Propal', 'Devis', 'Contrat', 'Cahier de charge'], default: 'Propal' }) 
  natureDocument: string; 
  @Column({ default: false })
  imported: boolean;
  

  @ManyToOne(() => Prospect, (prospect) => prospect.document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prospectId' })  
  prospect: Prospect;  
  //@ManyToOne(() => Step, (step) => step.documents, { onDelete: 'CASCADE' })
  //step: Step;
  @ManyToOne(() => Card, (card) => card.steps)
  card: Card;
}
