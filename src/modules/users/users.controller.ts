import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListAllUsersDto } from './dto/list-users.dto';
import PaginationWrapper from 'src/utils/pagination/pagination-wrapper';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/lib/swagger/paginated-response';
import { Request } from 'express';
import { AutenticatedJwtUser } from 'src/types/modules/auth/signin-jwt-payload';
import { RequiredPermission } from 'src/modules/auth/strategy/roles.guard';
import { ListedUserDto } from './dto/listed-user.dto';
import { RolePermissionName } from 'src/types/roles/role-permission';

const requiredPermission: RolePermissionName =
  'users';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @RequiredPermission(requiredPermission, 'create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(ListedUserDto)
  async findAll(@Req() req: Request, @Query() params: ListAllUsersDto) {
    const user = req.user as AutenticatedJwtUser;
    const shouldSimplifyResult =
      !user.getPermissionByName(requiredPermission)?.read;

    const data = await this.userService.listAll(
      params,
      shouldSimplifyResult,
    );

    return PaginationWrapper({
      data,
      page: params.page,
      limit: params.limit,
    });
  }

  @Get(':id')
  @RequiredPermission(requiredPermission, 'read')
  findOne(@Param('id') id: string) {
    return this.userService.findById({ id });
  }

  @Put(':id')
  @RequiredPermission(requiredPermission, 'update')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @RequiredPermission(requiredPermission, 'delete')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
