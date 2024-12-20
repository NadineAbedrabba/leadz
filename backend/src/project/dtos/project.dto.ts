// src/dtos/projet.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class ProjetDTO {
  @IsNotEmpty()
  @IsString()
  nomProjet: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  dateCreation: Date;

  @IsOptional()
  clientId: number;

  @IsOptional()
  prospectId?: number;
}
