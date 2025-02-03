// src/dtos/contact.dto.ts
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class ContactDTO {
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  identifiant: string;

  @IsEnum(['physique', 'moral'])
  type: 'physique' | 'moral';

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsNotEmpty()
  @IsString()
  pays: string;

  @IsEnum(['contact', 'prospect', 'client'])
  typeContact: 'contact' | 'prospect' | 'client';

  @IsOptional()
  createdAt?: Date;
}
