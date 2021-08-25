import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { UserService } from '../src/user.service';

jest.mock('../src/user.service');

describe('UserService testing', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  const alfonso = {
    id: 1,
    username: 'Alfonso',
    password: 'password',
  };

  it('service should be definsed', async () => {
    expect(service).toBeDefined();
  });

  it('should get all the users', async () => {
    const response = [
      { id: 1, password: 'password', username: 'Alfonso' },
      { id: 2, password: 'password', username: 'Luca' },
      { id: 3, password: 'password', username: 'Marco' },
      { id: 4, password: 'password', username: 'Francesco' },
      { id: 5, password: 'password', username: 'Antonio' },
    ];
    expect(await service.getAllUsers()).toEqual(response);
  });

  it('should get the precise user', async () => {
    expect(await service.getUser('Alfonso')).toEqual(alfonso);
  });

  it('should find user by id', async () => {
    expect(await service.exsistUserById('1')).toEqual(true);
  });

  it('should create a new user', async () => {
    const out = {
      username: 'Alfonso',
      password: 'password',
    };
    const expected = {
      id: 1,
      username: 'Alfonso',
      password: 'password',
    };
    expect(await service.createUser(out)).toEqual(expected);
  });

  describe('errors', () => {
    it('get null by getting the wrog username', async () => {
      expect(await service.getUser('inesistente')).toBeNull();
    });
  });
});
