import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ UserService, PrismaService],
})
export class AppModule {}
