import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { NomineeService } from '../src/nominee.service';

jest.mock('../src/nominee.service');

describe('UserService testing', () => {
    let service: NomineeService;
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [NomineeService, PrismaService],
      }).compile();
  
      service = module.get<NomineeService>(NomineeService);
    });


    it('should get the nominee by id', async()=> {
        let expected = {
            id: 3,
            nominee: 'Trump'

        }
        expect(await service.getNominee(3)).toEqual(expected)
    });

    it('return null if the nominee does not exist',async()=> {
        expect(await service.getNominee(23)).toBeNull();
    } )

    it('should get all the nominees', async() => {
        expect(await service.getAllNominee()).toEqual([{"id": 1, "nominee": "GIGI"}, {"id": 2, "nominee": "Pluto"}, {"id": 3, "nominee": "Trump"}, {"id": 4, "nominee": "Obama"}, {"id": 5, "nominee": "Clinton"}, {"id": 6, "nominee": "Biden"}]
        );
    })

    it('should create a new nominee', async()=> {
        expect(await service.createNominee({nominee: 'Trump'})).toEqual(
            {
                id: 3,
                nominee: 'Trump'
            }
        )
    })

})