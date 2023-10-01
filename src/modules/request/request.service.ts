import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './entities/request.entity';
import { Repository } from 'typeorm';
import { RequestType } from './enum/request_type.enum';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    private userService: UserService,
  ) {}

  async createRequest(
    subject: string,
    email: string,
    description: string,
    requestType: RequestType,
    user: UserEntity,
  ) {
    const request = await this.requestRepository.create({
      subject,
      email,
      description,
      requestType,
      user,
    });
    if (!request) {
      return new Error('Failed Creating Request');
    }
    return await this.requestRepository.save(request);
  }

  async createSubmitRequest(
    subject: string,
    email: string,
    description: string,
  ) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new Error('User not found');
    }
    const newRequest = await this.createRequest(
      subject,
      email,
      description,
      RequestType.SUPPORT,
      user,
    );
    if (!newRequest) {
      return new Error('Failed Creating Support Request');
    }
    return newRequest;
  }

  async createReportRequest(
    subject: string,
    email: string,
    description: string,
  ) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new Error('User not found');
    }
    const newRequest = await this.createRequest(
      subject,
      email,
      description,
      RequestType.REPORT,
      user,
    );
    if (!newRequest) {
      return new Error('Failed Creating Report Request');
    }
    return newRequest;
  }

  async findSupportRequestByEmail(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new Error('User not found');
    }
    const requests = await this.requestRepository.findAndCount({
      where: { requestType: RequestType.SUPPORT, user },
    });
    return requests;
  }

  async findReportRequestByEmail(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new Error('User not found');
    }
    const requests = await this.requestRepository.findAndCount({
      where: { requestType: RequestType.REPORT, user },
    });
    return requests;
  }

  async findAllSupportRequest(): Promise<any> {
    const requests = await this.requestRepository.find({
      where: {
        requestType: RequestType.SUPPORT,
      },
    });
    if (!requests) {
      return new Error('Failed Fetching Requests');
    }
    return requests;
  }

  async findAllReportRequest(): Promise<any> {
    const requests = await this.requestRepository.find({
      where: {
        requestType: RequestType.REPORT,
      },
    });
    if (!requests) {
      return new Error('Failed Fetching Requests');
    }
    return requests;
  }
}
