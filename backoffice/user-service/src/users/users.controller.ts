import {
  UseGuards,
  Controller,
  Get,
  Response,
  HttpStatus,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  Logger,
  LoggerService,
  Inject,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from './joi/user.joi';
import { ClientProxy } from '@nestjs/microservices';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    @Inject(Logger) private readonly logger: LoggerService,
    @Inject('COMPANY_SERVICE') private readonly company: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.company.connect();
  }

  @Get()
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'user',
  })
  @ApiBearerAuth('access-token')
  public async getUsers(@Response() res) {
    const users = await this.service.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post('find')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'user',
  })
  public async findUser(@Response() res, @Body() query: string) {
    const queryCondition = query;
    const users = await this.service.findOne(queryCondition);
    return res.status(HttpStatus.OK).json(users);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'user',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async getById(@Response() res, @Param('id') id: string) {
    
    const response = await this.service.findById(id);
    return res.status(HttpStatus.OK).json(response);
  
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    resource: 'user',
  })
  @UsePipes(new JoiValidationPipe())
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async create(@Response() res, @Body() updateUserDto: CreateUserDto) {
    const response = await this.service.create(updateUserDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Patch('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    resource: 'user',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(
    @Param('id') id: string,
    @Response() res,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const response = await this.service.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'delete',
    resource: 'user',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async delete(@Param('id') id: string, @Response() res) {
    const response = await this.service.delete(id);
    return res.status(HttpStatus.OK).json(response);
  }
}
