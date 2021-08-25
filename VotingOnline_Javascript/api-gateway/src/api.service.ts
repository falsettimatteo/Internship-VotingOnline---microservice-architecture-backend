import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { stringify } from 'querystring';
const fetch = require('node-fetch');
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(
        @Inject('user-manager')private userManagerService: ClientProxy,
        @Inject('nominee-catalog')private nomineeCatalogService: ClientProxy,
        @Inject('voting-manager')private votingManagerService: ClientProxy
    ){}

    //Controller per User Manager service

  async getAllUser(){
    return await firstValueFrom(this.userManagerService.send('allUsers', {}) );
}

  async existByUsername(username:string, password:string){
   return await firstValueFrom(this.userManagerService.send('existByUsername', {username: username, password: password}));
  }

  async addUser(user: string,pass: string){
    let obj = {username: user, password: pass};
    return await firstValueFrom(this.userManagerService.send('addUser', obj));

  }

  //Controller per il Nominee Catalig Service
  async getAllNominee(){
      return await firstValueFrom(this.nomineeCatalogService.send('getAllNominees', {}));
  }

  async addNominee(nominee: string): Promise<string>{
      return await firstValueFrom( this.nomineeCatalogService.send('addNominee', {nominee: nominee}));
  }
   //Controller Voting Manager

   async countNominee(nomineeid: string){
       return await firstValueFrom( this.votingManagerService.send('countVotes', {nomineeid: nomineeid}));
    }

   //chiamate miste per registrare un voto
    async existUserById(userid: string): Promise<boolean>{
      return await firstValueFrom(this.userManagerService.send('existByUserid', {userid: userid}));
    }

    async hasAlreadyVoted(userid: string): Promise<boolean>{
        return await firstValueFrom(this.votingManagerService.send('hasAlreadyVoted', {usernameid: userid}));
    }

    async makeVote(usernameid: string, nomineeid: string): Promise<string>{
return await firstValueFrom(this.votingManagerService.send('vote', {usernameid: usernameid, nomineeid: nomineeid}));
        
    }

    async makeVoteTimeout(usernameid: string, nomineeid: string): Promise<any>{
        return await firstValueFrom(this.votingManagerService.send('voteTimeout', {usernameid: usernameid, nomineeid: nomineeid}));
                
            }


}