import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn} from 'typeorm';
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
  
    @Column()
    contactId: number;
  
    @ManyToOne(() => Prospect, (prospect) => prospect.document, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'prospectId' })  // Spécifie la colonne qui contient la clé étrangère
    prospect: Prospect;  // Assurez-vous que la propriété 'prospect' est définie ici

 
}

