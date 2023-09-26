import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update_card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/findByEmail')
  async findCardByEmail(@Query() updateCardDto: UpdateCardDto): Promise<any> {
    const { email } = updateCardDto;
    try {
      const card = await this.cardService.findCardByEmail(email);
      return card;
    } catch (error) {
      return { message: `Card Not Found with email : ${email}`, error };
    }
  }

  @Patch('/updateCard')
  async updateCard(@Body() updateCardDto: UpdateCardDto): Promise<any> {
    const { email, cardType } = updateCardDto;
    const updatedCard = await this.cardService.updateCard(email, cardType);
    if (!updatedCard) {
      return { message: 'Error Updating Card' };
    }
    return updatedCard;
  }
}
