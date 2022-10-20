import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class CreateGenderDto {
  @ApiProperty()
  @MaxLength(30)
  name: string;
}
