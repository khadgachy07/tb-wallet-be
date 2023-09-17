import { Body, Controller, Get, Patch } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { GetAddressDto } from './dto/get_address.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('findByBit')
  async findWalletByBitAddress(@Body() walletDto: WalletDto): Promise<any> {
    try {
      const wallet = await this.walletService.findWalletbyBitAddress(
        walletDto.bitAddress,
      );
      return wallet;
    } catch (error) {
      return {
        message: `Wallet not found with Bitcoin Address: ${walletDto.bitAddress}`,
        error: error.message,
      };
    }
  }

  @Get('findByEth')
  async findWalletByEthAddress(@Body() walletDto: WalletDto): Promise<any> {
    try {
      const wallet = await this.walletService.findWalletbyEthAddress(
        walletDto.ethAddress,
      );
      return wallet;
    } catch (error) {
      return {
        message: `Wallet not found with Ethereum Address: ${walletDto.ethAddress}`,
        error: error.message,
      };
    }
  }

  @Get('getBitAddress')
  async getBitAddress(@Body() getAddressDto: GetAddressDto): Promise<string> {
    if (!getAddressDto.email) {
      throw new Error('Email is required');
    }
    return await this.walletService.getYourBitAddress(getAddressDto.email);
  }

  @Get('getEthAddress')
  async getEthAddress(@Body() getAddressDto: GetAddressDto): Promise<string> {
    if (!getAddressDto.email) {
      throw new Error('Email is required');
    }
    return await this.walletService.getYourEthAddress(getAddressDto.email);
  }

  @Patch('creditBalance')
  async creditBalance(@Body() walletDto: WalletDto): Promise<any> {
    const { bitAddress, btcBalance, ethAddress, ethBalance } = walletDto;
    try {
      if (bitAddress && btcBalance) {
        return await this.walletService.creditBtcBalance(
          bitAddress,
          btcBalance,
        );
      } else if (ethAddress && ethBalance) {
        return await this.walletService.creditEthBalance(
          ethAddress,
          ethBalance,
        );
      } else {
        return { message: 'Error Updating Balance', error: Error };
      }
    } catch (error) {}
  }

  @Patch('debitBalance')
  async debitBalance(@Body() walletDto: WalletDto): Promise<any> {
    const { bitAddress, btcBalance, ethAddress, ethBalance } = walletDto;
    if (bitAddress && btcBalance) {
      return await this.walletService.debitBtcBalance(bitAddress, btcBalance);
    } else if (ethAddress && ethBalance) {
      return await this.walletService.debitEthBalance(ethAddress, ethBalance);
    } else {
      throw new Error('Error Updating Balance');
    }
  }
}
