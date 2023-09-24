import { Injectable } from '@nestjs/common';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createWallet(): Promise<WalletEntity> {
    const bitAddress = await this.generateBitcoinLikeAddress();
    const ethAddress = await this.generateEthereumLikeAddress();
    if (!bitAddress && !ethAddress) {
      throw new Error('Error generating wallet address');
    }
    const wallet = await this.walletRepository.create({
      bitAddress,
      ethAddress,
    });
    await this.walletRepository.save(wallet);
    return wallet;
  }
  async findWalletbyBitAddress(bitAddress: string): Promise<any> {
    if (!bitAddress) {
      throw new Error('Error Getting Bitcoin Address');
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        bitAddress,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet;
  }

  async findWalletbyEthAddress(ethAddress: string): Promise<any> {
    if (!ethAddress) {
      throw new Error('Error Getting Ethereum Address');
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        ethAddress,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet;
  }

  async getYourBitAddress(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        user,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet.bitAddress;
  }

  async getYourEthAddress(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        user,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet.ethAddress;
  }

  async findUserByWalletAddress(walletAddress: string): Promise<any> {
    let user: UserEntity | undefined;
    if (walletAddress[0] == 'b') {
      user = await this.userRepository.findOne({
        where: {
          wallet: {
            bitAddress: walletAddress,
          },
        },
        relations: ['wallet'],
      });
    } else if (walletAddress[0] == 'e') {
      user = await this.userRepository.findOne({
        where: {
          wallet: {
            ethAddress: walletAddress,
          },
        },
        relations: ['wallet'],
      });
    }
    if (!user) {
      return new Error('User not found');
    }
    return user;
  }

  async creditBtcBalance(bitAddress: string, btcBalance: number): Promise<any> {
    if (!bitAddress || !btcBalance) {
      throw new Error('Error Updating Bitcoin Balance');
    }
    const wallet = await this.findWalletbyBitAddress(bitAddress);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    wallet.btcBalance += Number(btcBalance);
    await this.walletRepository.update(
      { walletId: wallet.walletId },
      { btcBalance: wallet.btcBalance },
    );
    return wallet;
  }

  async creditEthBalance(ethAddress: string, ethBalance: number): Promise<any> {
    if (!ethAddress || !ethBalance) {
      throw new Error('Error Updating Ethereum Balance');
    }
    const wallet = await this.findWalletbyEthAddress(ethAddress);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    wallet.ethBalance += ethBalance;
    await this.walletRepository.update(
      {
        walletId: wallet.walletId,
      },
      {
        ethBalance: wallet.ethBalance,
      },
    );
    return wallet;
  }

  async debitBtcBalance(bitAddress: string, btcBalance: number): Promise<any> {
    if (!bitAddress || !btcBalance) {
      throw new Error('Error Updating Bitcoin Balance');
    }
    const wallet = await this.findWalletbyBitAddress(bitAddress);
    if (!wallet) {
      return { message: 'Wallet not found' };
    }
    if (wallet.btcBalance < btcBalance) {
      return { message: 'Error Updating Balance' };
    }
    wallet.btcBalance -= Number(btcBalance);
    await this.walletRepository.update(
      {
        walletId: wallet.walletId,
      },
      {
        btcBalance: wallet.btcBalance,
      },
    );
    return wallet;
  }

  async debitEthBalance(ethAddress: string, ethBalance: number): Promise<any> {
    if (!ethAddress || !ethBalance) {
      return new Error('Error Updating Ethereum Balance');
    }
    const wallet = await this.findWalletbyEthAddress(ethAddress);
    if (!wallet) {
      return { messga: 'Wallet not found' };
    }
    if (wallet.ethBalance < ethBalance) {
      return { message: 'Inefficient Balance' };
    }
    wallet.ethBalance -= Number(ethBalance);
    await this.walletRepository.update(
      {
        walletId: wallet.walletId,
      },
      {
        ethBalance: wallet.ethBalance,
      },
    );
    return wallet;
  }

  async findWalletByEmail(email: string): Promise<any> {
    if (!email) {
      throw new Error('Error Getting Email');
    }
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const wallet = await this.walletRepository.findOne({
      where: {
        user,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet;
  }

  async findUserByWallet(walletDto: any): Promise<any> {
    if (!walletDto.bitAddress && !walletDto.ethAddress) {
      throw new Error('Error Getting Wallet');
    }
    let user: UserEntity | undefined;
    if (walletDto.bitAddress) {
      user = await this.userRepository.findOne({
        where: {
          wallet: {
            bitAddress: walletDto.bitAddress,
          },
        },
        relations: ['wallet'],
      });
    } else if (walletDto.ethAddress) {
      user = await this.userRepository.findOne({
        where: {
          wallet: {
            ethAddress: walletDto.ethAddress,
          },
        },
        relations: ['wallet'],
      });
    }
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  generateBitcoinLikeAddress(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 39; // Adjust the length as needed

    let bitcoinLikeAddress = 'bc1'; // Bitcoin addresses often start with 'bc1'

    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bitcoinLikeAddress += characters.charAt(randomIndex);
    }

    return bitcoinLikeAddress;
  }

  generateEthereumLikeAddress(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 40;

    let ethLikeAddress = '0x'; // Ethereum addresses often start with '0x

    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ethLikeAddress += characters.charAt(randomIndex);
    }
    return ethLikeAddress;
  }
}
