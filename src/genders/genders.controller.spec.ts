import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';

describe('GendersController', () => {
  let controller: GendersController;
  let service: GendersService;

  const mockRepository: object = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneByOrFail: jest.fn(),
    update: jest.fn(),
  }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GendersController],
      providers: [GendersService, {
        provide: getRepositoryToken(Gender),
        useValue: mockRepository
      }],
    }).compile();

    controller = module.get<GendersController>(GendersController);
    service = module.get<GendersService>(GendersService);
  });

  it('should controller be defined', () => {
    expect(controller).toBeDefined();
  });

});
