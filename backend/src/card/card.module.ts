import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card } from './entities/card.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Card])], // Assure-toi d'importer le module TypeOrmModule pour Card
  providers: [CardService], // Assure-toi que CardService est un provider
  controllers: [CardController], // Ton contrôleur pour les cartes
})
export class CardModule {}

