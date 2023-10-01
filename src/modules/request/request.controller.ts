import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('createSupport')
  async createSupportRequest(@Body() requestDto: RequestDto): Promise<any> {
    const { subject, email, description } = requestDto;
    const request = await this.requestService.createSubmitRequest(
      subject,
      email,
      description,
    );
    return request;
  }

  @Post('createReport')
  async createReportRequest(@Body() requestDto: RequestDto): Promise<any> {
    const { subject, email, description } = requestDto;
    const request = await this.requestService.createReportRequest(
      subject,
      email,
      description,
    );
    return request;
  }

  @Get('findSupport')
  async findAllSupportRequest(): Promise<any> {
    const requests = await this.requestService.findAllSupportRequest();
    if (!requests) {
      return new Error('Failed Fetching Requests');
    }
    return requests;
  }

  @Get('findReport')
  async findAllReportRequest(): Promise<any> {
    const requests = await this.requestService.findAllReportRequest();
    if (!requests) {
      return new Error('Failed Fetching Requests');
    }
    return requests;
  }

  @Get('findSupportByEmail')
  async findSupportRequestByEmail(
    @Query() requestDto: RequestDto,
  ): Promise<any> {
    return await this.requestService.findSupportRequestByEmail(
      requestDto.email,
    );
  }

  @Get('findReportByEmail')
  async findReportRequestByEmail(
    @Query() requestDto: RequestDto,
  ): Promise<any> {
    return await this.requestService.findReportRequestByEmail(requestDto.email);
  }
}
