import { Controller } from '@nestjs/common';
import { VoteDataService } from './votedata.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly voteDataService: VoteDataService) {}

  @MessagePattern('countVotes')
  async countVoters(@Payload('nomineeid') nomineeId: string): Promise<number>{
    return await this.voteDataService.voteCounter(nomineeId);
  }

    @MessagePattern('vote')
    async vote(
      @Payload('usernameid') usernameid: string,
      @Payload('nomineeid') nomineeid: string,
    ): Promise<string>{
      let vote = {
        "userId": parseInt(usernameid),
        "nomineeId": parseInt(nomineeid)
      }

        let response = await this.voteDataService.addVote(vote).catch(() => {
          return ("Impossible to make a vote");
        });
         return ("The vote has been saved successfully");   
      

    }



@MessagePattern('hasAlreadyVoted')
async hasAlreadyVoted(@Payload("usernameid")usernameid: string): Promise<boolean>{
  return await this.voteDataService.alreadyVoted(usernameid);
}

@MessagePattern('voteTimeout')
    async voteTimeout(
      @Payload('usernameid') usernameid: string,
      @Payload('nomineeid') nomineeid: string,
    ): Promise<any>{
      let vote = {
        "userId": parseInt(usernameid),
        "nomineeId": parseInt(nomineeid)
      }
      console.log("--- WAITING for 5 SECONDS ---")
      setTimeout(async () => {
      console.log(" --- end of 5 seconds ---");
     }, 5000);
      

    }

  }

  
