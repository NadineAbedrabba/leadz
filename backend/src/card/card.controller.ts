import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Patch(':cardId/steps/:stepId')
  updateStepCompletion(
    @Param('cardId') cardId: number,
    @Param('stepId') stepId: number,
    @Body('completed') completed: boolean,
  ) {
    return this.cardService.updateStepCompletion(cardId, stepId, completed);
  }
}
