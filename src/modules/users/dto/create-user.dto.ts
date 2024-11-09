import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  isEmail,
  IsEmail,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IsGenericRelationItem } from 'src/lib/swagger/validations';
import { GenericRelationItemDto } from 'src/utils/helpers/dto/generic-relation-item.dto';

export class CreateUserDataDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(14)
  document: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @Transform(({ value }) => {
    return value && typeof value === 'string' ? JSON.parse(value) : value;
  })
  isActive: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsGenericRelationItem()
  role: GenericRelationItemDto;
}

export class CreateUserDto {
  @ValidateNested()
  @Type(()=>CreateUserDataDto)
  data: CreateUserDataDto

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', nullable: true})
  @Transform(({ value }) => {
    return value && typeof value === 'string' ? JSON.parse(value) : value;
  })
  picture?: Express.Multer.File | null;
}
