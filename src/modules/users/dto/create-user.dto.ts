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
} from 'class-validator';
import { IsGenericRelationItem } from 'src/lib/swagger/validations';
import { GenericRelationItemDto } from 'src/utils/helpers/dto/generic-relation-item.dto';

export class CreateUserDto {
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
  isActive: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsGenericRelationItem()
  role: GenericRelationItemDto;
}
