import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  findAll(): Promise<Card[]> {
    return this.cardRepository.find({ relations: ['steps', 'steps.documents'] });
  }

  async updateStepCompletion(cardId: number, stepId: number, completed: boolean) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['steps'],
    });

    if (!card) throw new Error('Card not found');

    const step = card.steps.find((s) => s.id === stepId);
    if (!step) throw new Error('Step not found');

    step.completed = completed;
    await this.cardRepository.save(card);
  }
}
