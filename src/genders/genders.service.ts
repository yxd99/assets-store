import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto): Promise<object> {
    await this.validateIfExistGenderName(createGenderDto.name);
    const res = await this.genderRepository.save(createGenderDto);
    return {
      message: `gender \"${res.name}\" has been added`,
    };
  }

  async findAll(): Promise<Gender[]> {
    return await this.genderRepository.find();
  }

  async findOne(id: number): Promise<Gender> {
    const res = await this.genderRepository.findOneBy({
      id
    });
    if(!(!!res)) throw new NotFoundException({message: `Gender \"${id}\" don't exist`});
    return res;
  }

  async update(id: number, updateGenderDto: UpdateGenderDto): Promise<object> {
    if(Object.keys(updateGenderDto).length == 0) throw new BadRequestException({ message: `Information to update was not sent` });
    const oldGender = await this.findOne(id);
    
    await this.validateIfExistGenderName(updateGenderDto.name);
    await this.genderRepository.update(id, updateGenderDto);
    return {
      message: `Gender \"${oldGender.name}\" change to \"${updateGenderDto.name}\"`,
    };
  }

  async remove(id: number): Promise<object> {
    await this.findOne(id);
    await this.genderRepository.softDelete(id);

    return {
      message: `Gender with id \"${id}\" delete`,
    };
  }

  private async validateIfExistGenderName(name: string) {
    const gender = await this.genderRepository.findOneBy({
      name
    });
    if (!!gender)
      throw new BadRequestException({
        message: `The gender \"${name}\" already exists`,
      });
  }
}
