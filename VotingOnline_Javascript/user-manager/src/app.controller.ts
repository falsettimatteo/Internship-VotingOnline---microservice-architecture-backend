import { Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
  ) {}


    @MessagePattern('allUsers')
    async getAllUsers(): Promise<UserModel[]> {
      return await this.userService.getAllUsers();
      
    }

  @MessagePattern('existByUsername') //, :username/:password')
  async existByUsername(@Payload('username') username: string, @Payload('password')password: string): Promise<boolean> {
    let user = await this.userService.getUser(username);
    if(user){
    if(user.username == username && user.password == password){
      return true;
    }return false;
  }return false;
  }

  @MessagePattern("existByUserid")
  async existById(@Payload('userid')userid: string): Promise<boolean>{
    return await this.userService.exsistUserById(userid);
  }


  @MessagePattern('addUser')
  async signupUser(
    @Payload('username')username: string,
    @Payload('password')password: string): Promise<string> {
    let exist = await this.userService.createUser({
        "username": username,
        "password": password
      });
      if(exist){
        return("User added successfully");
      }
      return ("User not added, try again");
      
  }

}