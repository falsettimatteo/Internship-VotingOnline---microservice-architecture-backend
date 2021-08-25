import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, VoteData as VoteDataModel } from '@prisma/client';


@Injectable()
export class VoteDataService {
  constructor(private prisma: PrismaService) {}

  async voteCounter(nomineeId: string): Promise<number>{;
    return await this.prisma.voteData.count({
      where:{
        nomineeId: parseInt(nomineeId),
      }
    });
  }

  async alreadyVoted(usernameid: string): Promise<boolean>{
    let find: VoteDataModel = await this.prisma.voteData.findFirst({
      where: {userId: parseInt(usernameid)}
    });
    if(find){
      return true;
    }return false;
  }



    async addVote(data: Prisma.VoteDataCreateInput): Promise<VoteDataModel>{
     return {
         userId: data.userId,
         nomineeId: data.nomineeId
     }
    }
    
  
}
