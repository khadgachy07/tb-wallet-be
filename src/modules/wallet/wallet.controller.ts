import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { GetAddressDto } from './dto/get_address.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('find')
  async findWalletByEmail(@Query() EmailDto: any) {
    try {
      const wallet = await this.walletService.findWalletByEmail(EmailDto.email);
      return wallet;
    } catch (error) {
      return {
        message: `Wallet not found with Email: ${EmailDto.email}`,
        error: error.message,
      };
    }
  }

  @Get('findUserByWallet')
  async findUserByWallet(@Query() walletDto: WalletDto): Promise<any> {
    try {
      const user = await this.walletService.findUserByWallet(walletDto);
      return user;
    } catch (error) {
      return {
        message: `User not found with Wallet: ${walletDto.bitAddress} or ${walletDto.ethAddress}`,
        error: error.message,
      };
    }
  }

  @Get('findByBit')
  async findWalletByBitAddress(@Query() walletDto: WalletDto): Promise<any> {
    console.log(walletDto.bitAddress);
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
  async findWalletByEthAddress(@Query() walletDto: WalletDto): Promise<any> {
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
  async getBitAddress(@Query() getAddressDto: GetAddressDto): Promise<string> {
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
        return { message: 'Error Updating Balance' };
      }
    } catch (error) {
      return { message: 'Error Updating Balance' };
    }
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
