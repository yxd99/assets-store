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
import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('titles')
@ApiTags('Titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'title ":name" has been added',
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
            status: {
              type: 'number',
              default: 400,
            },
            message: {
              type: 'array',
              default: [],
              example: [
                'name must be shorter than or equal to 100 characters',
                'name must be longer than or equal to 2 characters',
                'name must be a string',
                'releaseDate must be a valid ISO 8601 date string',
                'productionCompany must be shorter than or equal to 40 characters',
                'productionCompany must be longer than or equal to 2 characters',
                'productionCompany must be a string',
                'genders must contain at least 1 elements',
                'genders must be an array',
              ],
            },
            error: {
              type: 'string',
              default: 'Bad Request',
            },
          },
        },
      ],
    },
  })
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.create(createTitleDto);
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
              releaseDate: {
                type: 'string',
                format: 'date',
                pattern: 'YYYY-MM-DD',
              },
              productionCompany: { type: 'string' },
            },
          },
        },
      ],
    },
  })
  findAll() {
    return this.titlesService.findAll();
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
              type: 'string',
            },
            releaseDate: {
              type: 'string',
              format: 'date',
              pattern: 'YYYY-MM-DD',
            },
            productionCompany: { type: 'string' },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'title \":id\" doesn\'t exist'
            }
          }
        }
      ]
    }
  })
  findOne(@Param('id') id: string) {
    return this.titlesService.findOne(+id);
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
              default: 'title \":id\" has been successfully updated'
            }
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
              default: 'title \":id\" doesn\'t exist'
            }
          }
        }
      ]
    }
  })
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titlesService.update(+id, updateTitleDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      allOf: [{
        properties: {
          message: {
            type: 'string',
            default: 'title \"2\" has been removed'
          }
        }
      }]
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
              default: 'title \":id\" doesn\'t exist'
            }
          }
        }
      ]
    }
  })
  remove(@Param('id') id: string) {
    return this.titlesService.remove(+id);
  }
}
