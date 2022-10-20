import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>
  ){}

  async create(createTitleDto: CreateTitleDto): Promise<object> {
    await this.titleRepository.save(createTitleDto);
    return {
      message: `title \"${createTitleDto.name}\" has been added`
    }
  }

  async findAll(): Promise<Title[]> {
    return await this.titleRepository.find();
  }

  async findOne(id: number): Promise<Title> {
    const title = await this.titleRepository.findOneBy({id});
    if(!(!!title)) throw new NotFoundException({ message: `title \"${id}\" doesn't exist` });
    return title;
  }

  async update(id: number, updateTitleDto: UpdateTitleDto): Promise<object> {
    await this.findOne(id);
    if(!(!!(Object.keys(updateTitleDto).length))) throw new BadRequestException({ message: `Information to update was not sent` });
    await this.titleRepository.update(id, updateTitleDto);
    return {
      message: `title \"${id}\" has been successfully updated`
    }
  }

  async remove(id: number): Promise<object> {
    await this.findOne(id);
    await this.titleRepository.softDelete(id);
    return {
      message: `title \"${id}\" has been removed`
    }
  }
}
