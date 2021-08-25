import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NomineeService } from './nominee.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [NomineeService, PrismaService],
})
export class AppModule {}
