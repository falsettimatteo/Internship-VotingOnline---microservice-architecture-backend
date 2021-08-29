import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NomineeService } from './nominee.service';
import { Nominee as NomineeModel } from '@prisma/client';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly nomineeService: NomineeService) {}

  @MessagePattern('getAllNominees')
  async getAllNominee(): Promise<NomineeModel[]> {
    return await this.nomineeService.getAllNominee();
  }

  @MessagePattern('addNominee')
  async signupNominee(
    @Param('nominee')nominee: string): Promise<string> {
   let response = await this.nomineeService.createNominee({
      "nominee": nominee}).then(() => {
        return ("You have successfully added " + nominee + "as a new nominee")
      }).catch(() => {
        return ("Nominee not added, try again!");
      });
      return response;
  }


}
