import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Nominee, Prisma } from '@prisma/client';

@Injectable()
export class NomineeService {
  constructor(private prisma: PrismaService) {}

  async getNominee(nomineeid: number): Promise<Nominee | null> {
    return this.prisma.nominee.findFirst({
      where: { id: nomineeid },
    });
  }

  async getAllNominee(): Promise<Nominee[]> {
    return this.prisma.nominee.findMany();
  }

  async createNominee(data: Prisma.NomineeCreateInput): Promise<Nominee> {
    return this.prisma.nominee.create({
      data,
    });
  }
}
