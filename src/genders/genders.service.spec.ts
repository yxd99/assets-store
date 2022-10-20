import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
import { GendersService } from './genders.service';

describe('GendersService', () => {
  let service: GendersService;
  let genderRepository: Repository<Gender>;

  const gender = {
    dateDelete: '',
    id: 1,
    name: 'preview',
  };

  const mockRepository: object = {
    save: jest.fn(() => gender),
    create: jest.fn(),
    find: jest.fn(() => []),
    findOneBy: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };
  const GENDER_REPOSITORY_TOKEN = getRepositoryToken(Gender);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GendersService,
        {
          provide: GENDER_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GendersService>(GendersService);
    genderRepository = module.get<Repository<Gender>>(GENDER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('genderRepository should be defined', () => {
    expect(genderRepository).toBeDefined();
  });

  describe('create gender', () => {
    it('should successfuly created gender', async () => {
      const process = await service.create(gender);
      expect(process).toStrictEqual({
        message: `gender "${gender.name}" has been added`,
      });
    });

    it('should reject because the name is duplicate / exist', async () => {
      jest.spyOn(genderRepository, 'findOneBy').mockImplementationOnce(() => {
        throw new BadRequestException({
          message: `The gender "${gender.name}" already exist`,
        });
      });
      try {
        await service.create(gender);
      } catch (e) {
        expect(e).toStrictEqual(
          new BadRequestException({
            message: `The gender "${gender.name}" already exist`,
          }),
        );
      }
    });
  });

  describe('update gender', () => {
    it('should successfuly updated gender', async () => {
      jest.spyOn(genderRepository, 'findOneBy').mockImplementationOnce(async () => gender);
      
      expect(await service.update(gender.id, gender)).toStrictEqual({
        message: 'Gender "preview" change to "preview"',
      });
    });

    it('should reject because the name is duplicate / exist', async () => {
      jest.spyOn(genderRepository, 'findOneBy').mockImplementationOnce(() => {
        throw new BadRequestException({
          message: `The gender "${gender.name}" already exist`,
        });
      });
      try {
        await service.create(gender);
      } catch (e) {
        expect(e).toStrictEqual(
          new BadRequestException({
            message: `The gender "${gender.name}" already exist`,
          }),
        );
      }
    });

    it('shoult reject incorrect id', async () => {
      jest.spyOn(genderRepository, 'findOneBy').mockImplementationOnce(() => {
        throw new NotFoundException({message: `Gender \"${gender.id}\" don't exist`});
      });
      try {
        await service.update(gender.id, gender);
      } catch (e) {
        expect(e).toStrictEqual(new NotFoundException({
          message: `Gender \"${gender.id}\" don't exist`,
        }));
      }
    });

    it('shoult reject empty data', async () => {
      try {
        await service.update(gender.id, {});
      } catch (e) {
        expect(e).toStrictEqual(new BadRequestException({
          message: `Information to update was not sent`,
        }));
      }
    });
  });

  describe('find all gender', () => {
    it('should return all genders', async () => {
      expect(await service.findAll()).toStrictEqual([]);
    });
  });

  describe('find one gender', () => {
    it('should return one gender', async () => {
      jest
        .spyOn(genderRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(gender));

      expect(await service.findOne(gender.id)).toStrictEqual(gender);
    });

    it('should reject invalid id', async () => {
      try {
        await service.findOne(gender.id);
      } catch (e) {
        expect(e).toStrictEqual(new NotFoundException({
          message: `Gender \"${gender.id}\" don't exist`,
        }));
      }
    });
  });

  describe('delete gender', () => {
    it('should gender has been deleted', async () => {
      jest.spyOn(genderRepository, 'findOneBy').mockImplementationOnce(() => Promise.resolve(gender));
      expect(await service.remove(gender.id)).toStrictEqual({
        message: `Gender with id ${gender.id} delete`,
      });
    });

    it('should reject because dont exist id', async() => {
      try{
        await service.remove(gender.id);
      }catch(e){
        expect(e).toStrictEqual(new NotFoundException({
          message: `Gender \"${gender.id}\" don't exist`,
        }))
      }
    });
  });
});
