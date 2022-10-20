import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Title } from './entities/title.entity';
import { TitlesService } from './titles.service';

describe('TitlesService', () => {
  let service: TitlesService;
  let titleRepository: Repository<Title>;

  const title: object = {
    id: 1,
    name: 'cry',
    releaseDate: '1999-01-12',
    productionCompany: 'yxd',
    genders: [1]
  }

  const mockRepository: object = {
    save: jest.fn(() => title),
    create: jest.fn(),
    find: jest.fn(() => []),
    findOneBy: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };
  const TITLE_REPOSITORY_TOKEN = getRepositoryToken(Title);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitlesService, {
        provide: TITLE_REPOSITORY_TOKEN,
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<TitlesService>(TitlesService);
    titleRepository = module.get<Repository<Title>>(TITLE_REPOSITORY_TOKEN);
  });

  it('should be defined controller', () => {
    expect(service).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(titleRepository).toBeDefined();
  });

  describe('create title', () => {
    
  });
});
