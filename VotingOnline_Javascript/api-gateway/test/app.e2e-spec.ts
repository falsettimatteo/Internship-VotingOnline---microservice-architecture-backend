import { AppController } from '../src/app.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('appController testing', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  //da fare testing di integrazione
})
