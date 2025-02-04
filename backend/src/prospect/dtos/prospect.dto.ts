// src/dtos/prospect.dto.ts
import { ContactDTO } from '../../contact/dtos/contact.dto';
import { IsEnum, IsOptional, IsString, IsDateString , IsNumber } from 'class-validator';

export class ProspectDTO extends ContactDTO {
  @IsEnum(['Non intéressé', 'Intéressé', 'En négociation'])
  etat: 'Non intéressé' | 'Intéressé' | 'En négociation';

  @IsOptional()
  @IsDateString()
  dateDerniereInteraction?: Date;

  @IsOptional()
  @IsString()
  detailsDerniereInteraction?: string;
  @IsNumber()
  progress: number;
}
