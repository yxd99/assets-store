import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTitleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ minLength: 2, maxLength: 100 })
  name: string;

  @IsDateString()
  @ApiProperty({
    type: 'string',
    example: '1999-01-01',
    format: 'date',
    pattern: 'YYYY-MM-DD',
  })
  releaseDate: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @ApiProperty({ minLength: 2, maxLength: 40 })
  productionCompany: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: ['number'], minItems: 1})
  genders: number[];
}
