import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
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
    return await this.prisma.user.create({
      data,
    });
  }

  async exsistUserById(id: string): Promise<boolean>{
   let exist = await this.prisma.user.findFirst({
     where: {id: parseInt(id)}
   });
   if(exist){
     return true;
   }return false;
  
  }

/*
  async updateUser(id: number, username: string, password: string): Promise<void> {

    await this.prisma.user.update({
      where: {
        id: this.user.id,
      },
      data: {
        username: username,
        password: password,
      }
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }*/

}