import { Body, Controller, Get, Inject, Injectable, Param, Post } from '@nestjs/common';
import { ApiService } from './api.service';

const CircuitBreaker = require('opossum');


@Controller()
export class AppController {
constructor(
   private apiService: ApiService,
   ) {}


  private options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };

    //Controller per User Manager service
  @Get("/allUsers")
    async getAllUsersBreaker(){
      const breaker = new CircuitBreaker(this.apiService.getAllUser(), this.options);
      breaker.fallback(() => {
        return "FALLBACK : User manager service down";
      })
      return await breaker.fire();
    }


  @Get("/isLogged/:username/:password")
  async logUser(@Param('username')username: string, @Param('password')password: string){
    const breaker = new CircuitBreaker(this.apiService.existByUsername(username,password), this.options);
    breaker.fallback(() => {
      return "FALLBACK  : User manager service down";
    })
    return breaker.fire();
 }


  @Post("/addUser")
  async addUser(@Body('username')user: string, @Body('password')pass: string){
    const breaker = new CircuitBreaker(this.apiService.addUser(user,pass), this.options);
    breaker.fallback(() => {
      return "FALLBACK : User manager service down";
    });
    return breaker.fire();
  }

  //Controller per il Nominee Catalig Service

  @Get("/allNominees")
  async getAllNominee(){
    const breaker = new CircuitBreaker(this.apiService.getAllNominee(), this.options);
    breaker.fallback(() => {
      return "FALLBACK : Nominee catalog service down";
    });
    return breaker.fire();
  }

  @Post('/addNominee')
  async addNominee(@Body('nominee')nominee: string){
    const breaker = new CircuitBreaker(this.apiService.addNominee(nominee), this.options);
    breaker.fallback(() => {
      return "FALLBACK : nominee Catalog service down";
    });
    return breaker.fire();
  }
   //Controller Voting Manager
   @Get("/countVotes/:nomineeid")
   async countNominee(@Param('nomineeid')nomineeid: string){
     console.log(nomineeid);
     const breaker = new CircuitBreaker(await this.apiService.countNominee(nomineeid), this.options);
     breaker.fallback(() => {
      return "FALLBACK : Voting manager service down";
    });
    return await breaker.fire();
  }

   //chiamate miste:

   @Post("/vote")
   async vote(
     @Body('usernameid') usernameid: string,
   @Body('nomineeid') nomineeid: string,
    ): Promise<string>{
      const breaker = new CircuitBreaker(this.apiService.existUserById(usernameid), this.options);
      breaker.fallback(() => {
        return false;
      });
      let isUserLogged =await breaker.fire();
      if(isUserLogged){
        const breaker2 = new CircuitBreaker(this.apiService.hasAlreadyVoted(usernameid), this.options);
        breaker2.fallback(() => {
          return false;
        })
        let hasAlreadyVoted =await breaker2.fire();
        if(!hasAlreadyVoted){
          const breaker3 = new CircuitBreaker(this.apiService.makeVote(usernameid,nomineeid), this.options);
          breaker3.fallback(() => {
            return ("The system was unable to register the vote, try again please");
          })
          let response = await breaker3.fire();
          console.log(response);
          return await response;
        }else return ("Yuo have already voted");
      }else return ("this user is not registred in the platform")
    }

    @Post("/voteTimeout")
   async voteTimeout(
     @Body('usernameid') usernameid: string,
   @Body('nomineeid') nomineeid: string,
    ): Promise<string>{
      const breaker = new CircuitBreaker(this.apiService.existUserById(usernameid), this.options);
      breaker.fallback(() => {
        return false;
      });
      let isUserLogged =await breaker.fire();
      console.log("isUserLogged: "+ isUserLogged);
      if(isUserLogged){
        const breaker2 = new CircuitBreaker(this.apiService.hasAlreadyVoted(usernameid), this.options);
        breaker2.fallback(() => {
          return false;
        })
        let hasAlreadyVoted =await breaker2.fire();
        console.log("hasAlreadyLogged: "+ hasAlreadyVoted);
        if(!hasAlreadyVoted){
          const breaker3 = new CircuitBreaker(this.apiService.makeVoteTimeout(usernameid,nomineeid), this.options);
          breaker3.fallback(() => {
            return ("The system was unable to register the vote, try again please");
          })
          let response = await breaker3.fire();
          console.log(response);
          return await response;
        }else return ("Yuo have already voted");
      }else return ("this user is not registred in the platform")
    }
}
