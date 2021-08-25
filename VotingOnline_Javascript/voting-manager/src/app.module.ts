import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VoteDataService } from './votedata.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ VoteDataService, PrismaService],
})
export class AppModule {}