import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { CardDto } from './dto/card.dto';
import { CardType } from './enum/card_type.enum';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(firstName: string, lastName: string): Promise<CardEntity> {
    const card = await this.cardRepository.create({
      cardNumber: this.generateCardNumber(),
      cardHolder: `${firstName} ${lastName}`,
      cvv: this.generateCardCVV(),
    });
    await this.cardRepository.save(card);
    return card;
  }

  async findCardByNumber(cardDto: CardDto): Promise<any> {
    const { cardNumber } = cardDto;
    const card = await this.cardRepository.findOne({
      where: { cardNumber },
    });
    if (!card) {
      return { message: 'Card Not found' };
    }
    return card;
  }

  async findCardByName(cardDto: CardDto): Promise<any> {
    const { cardHolder } = cardDto;
    const card = await this.cardRepository.findOne({
      where: { cardHolder },
    });
    if (!card) {
      return { message: 'Card not found' };
    }
    return card;
  }

  async findCardByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { message: 'User not found' };
    }
    const card = await this.cardRepository.findOne({
      where: { user },
    });
    if (!card) {
      return { message: 'Card not found' };
    }
    return card;
  }

  async updateCard(email: string, cardType: CardType): Promise<any> {
    const card = await this.findCardByEmail(email);
    if (!card) {
      return { message: 'Card not found' };
    }
    card.cardStatus = 'ACTIVE';
    if (!Object.values(CardType).includes(cardType)) {
      return { message: 'Card type not found in Category' };
    }
    card.cardType = cardType;
    await this.cardRepository.save(card);
    return card;
  }

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
}
