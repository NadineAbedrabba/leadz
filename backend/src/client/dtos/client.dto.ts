// src/dtos/client.dto.ts
import { ContactDTO } from '../../contact/dtos/contact.dto';
import { IsEnum, IsInt, IsOptional, IsString, IsDateString, Min } from 'class-validator';

export class ClientDTO extends ContactDTO {
  @IsEnum(['Client', 'Client fidèle'])
  statut: 'Client' | 'Client fidèle';

  @IsInt()
  @Min(1)
  nbProjets: number;

  @IsOptional()
  @IsDateString()
  dateDerniereInteraction?: Date;

  @IsOptional()
  @IsString()
  detailsDerniereInteraction?: string;
}
