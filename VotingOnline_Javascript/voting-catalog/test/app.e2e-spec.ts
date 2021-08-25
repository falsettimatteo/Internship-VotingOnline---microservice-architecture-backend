
import { NomineeService } from "../src/nominee.service";
import { AppController } from "../src/app.controller";
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from "../src/prisma.service";

describe( 'appController testing', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [NomineeService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('describe the controller',async () => {
    let response = [{"id": 1, "nominee": "GIGI"}, {"id": 2, "nominee": "Pluto"}, {"id": 3, "nominee": "Trump"}, {"id": 4, "nominee": "Obama"}, {"id": 5, "nominee": "Clinton"}, {"id": 6, "nominee": "Biden"}];
    expect(await appController.getAllNominee()).toEqual(response)
  })

  it('should find by username', async() => {
    expect(await appController.signupUser('Trump')).toEqual({
      id: 3,
      nominee: 'Trump'
    })
  })

})
