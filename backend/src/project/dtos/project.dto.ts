// src/dtos/projet.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, } from 'class-validator';

export class ProjetDTO {
  @IsNotEmpty()
  @IsString()
  nomProjet: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  dateCreation: Date | null;

  @IsNotEmpty()
  contactId: number;
}
