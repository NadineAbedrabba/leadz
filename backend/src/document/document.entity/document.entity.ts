import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prospect } from '../../prospect/prospect.entity/prospect.entity';

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
  natureDocument: string; // Ajout de la nature du document

  @ManyToOne(() => Prospect, (prospect) => prospect.document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prospectId' })  
  prospect: Prospect;  
}
