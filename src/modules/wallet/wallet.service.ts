import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  generateBitcoinLikeAddress(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 34; // Adjust the length as needed

    let bitcoinLikeAddress = '1'; // Bitcoin addresses often start with '1'

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
