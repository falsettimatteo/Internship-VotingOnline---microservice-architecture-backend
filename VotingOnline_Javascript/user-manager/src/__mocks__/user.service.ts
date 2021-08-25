import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma,} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser (username: string) :Promise<User | null>{
    return await this.prisma.user.findFirst({
        where: {username: username},
      });
    } 
    

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return { id: 1,
        username: 'Alfonso',
    password: 'password'};
  }

  async exsistUserById(id: string): Promise<boolean>{
   let exist = await this.prisma.user.findFirst({
     where: {id: parseInt(id)}
   });
   if(exist){
     return true;
   }return false;
  
  }


}