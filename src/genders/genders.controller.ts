import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('genders')
@ApiTags('Genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'gender :name has been added',
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'The gender :name already exists',
            },
          },
        },
      ],
    },
  })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      allOf: [
        {
          items: {
            properties: {
              id: {
                type: 'number',
              },
              name: {
                type: 'string',
              },
            },
          },
        },
      ],
    },
  })
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      allOf: [
        {
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string'
            }
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Gender \":id\" don\'t exist'
            }
          }
        }
      ]
    }
  })
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Gender \":oldName\" change to \":newName\"'
            }
          }
        }
      ]
    }
  })

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Information to update was not sent'
            }
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Gender \":id\" don\'t exist'
            }
          }
        }
      ]
    }
  })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(+id, updateGenderDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Gender with id \":id\" delete'
            }
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'Gender \":id\" don\'t exist'
            }
          }
        }
      ]
    }
  })
  remove(@Param('id') id: string) {
    return this.gendersService.remove(+id);
  }
}
