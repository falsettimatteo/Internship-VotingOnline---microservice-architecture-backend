import { VoteDataService } from '../src/votedata.service';
import { AppController } from '../src/app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';


jest.mock('../src/votedata.service');

describe('appController testing', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [VoteDataService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  it('should count vote', async() => {
    expect(await appController.countVoters('3')).toEqual(1);
  })

  it('make a vote', async() => {
  
    expect(await appController.vote('1','2')).toEqual("The vote has been saved successfully");
  })

})