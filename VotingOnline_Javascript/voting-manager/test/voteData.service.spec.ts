import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { VoteDataService } from '../src/votedata.service';

jest.mock('../src/votedata.service');

describe('VoteData service testing', () => {
    let service: VoteDataService;
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [VoteDataService, PrismaService],
      }).compile();
  
      service = module.get<VoteDataService>(VoteDataService);
    });

    it('should count the vote for Trump', async() => {
        expect(await service.voteCounter('2')).toEqual(3);
    })

    it('return true - already voted',async() => {
        expect(await service.alreadyVoted('1')).toEqual(true);
    })

    it('return false - already voted', async() => {
        expect(await service.alreadyVoted('100')).toEqual(false);
    })

    it('shuld add a vote', async() => {
        const vote = {
            userId: 1,
            nomineeId: 2
        };
        expect(await service.addVote(vote) ).toEqual(vote);
    })

})