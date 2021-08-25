import { UserService } from '../src/user.service';
import { AppController } from '../src/app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';

describe('appController testing', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [UserService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('describe the controller', async () => {
    const response = [
      { id: 1, password: 'password', username: 'Alfonso' },
      { id: 2, password: 'password', username: 'Luca' },
      { id: 3, password: 'password', username: 'Marco' },
      { id: 4, password: 'password', username: 'Francesco' },
      { id: 5, password: 'password', username: 'Antonio' },
    ];
    expect(await appController.getAllUsers()).toEqual(response);
  });

  it('should find by username', async () => {
    expect(await appController.existByUsername('Alfonso', 'password')).toEqual(
      true,
    );
  });

  it('should find by id', async () => {
    expect(await appController.existById('1')).toEqual(true);
  });
});
