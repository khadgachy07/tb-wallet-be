import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  generateCardNumber(): string {
    const cardNumber = Array.from({ length: 16 }, () => randomInt(0, 9)).join(
      '',
    );
    return cardNumber.toString().padStart(16, '0');
  }

  generateCardCVV(): string {
    const min = 100;
    const max = 999;

    const randomCVV = randomInt(min, max);
    return randomCVV.toString().padStart(3, '0');
  }

  async create(firstName: string, lastName: string): Promise<CardEntity> {
    const card = await this.cardRepository.create({
      cardNumber: this.generateCardNumber(),
      cardHolder: `${firstName} ${lastName}`,
      cvv: this.generateCardCVV(),
    });
    await this.cardRepository.save(card);
    return card;
  }

  async findCardByNumber(cardDto: CardDto): Promise<CardEntity> {
    const { cardNumber } = cardDto;
    const card = await this.cardRepository.findOne({
      where: { cardNumber },
    });
    if (!card) {
      throw new Error('Card not found');
    }
    return card;
  }

  async findCardByName(cardDto: CardDto): Promise<CardEntity> {
    const { cardHolder } = cardDto;
    const card = await this.cardRepository.findOne({
      where: { cardHolder },
    });
    if (!card) {
      throw new Error('Card not found');
    }
    return card;
  }
}
