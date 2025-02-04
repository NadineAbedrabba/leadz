
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './entities/step.entity';
import { Card } from '../card/entities/card.entity';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step) private stepRepository: Repository<Step>,
    @InjectRepository(Card) private cardRepository: Repository<Card>, // On peut récupérer une carte si nécessaire
  ) {}
  
  create(createStepDto: CreateStepDto) {
    return 'This action adds a new step';
  }

  findAll() {
    return `This action returns all step`;
  }

  findOne(id: number) {
    return `This action returns a #${id} step`;
  }

  update(id: number, updateStepDto: UpdateStepDto) {
    return `This action updates a #${id} step`;
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
