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
import { UpdateTramiteDto } from './dto/updateTramite.dto';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/createTramite.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from './joi/tramite.joi';
import { ClientProxy } from '@nestjs/microservices';


@ApiTags('tramites')
@Controller('tramites')
export class TramitesController {
  constructor(
    private readonly service: TramitesService,
    @Inject(Logger) private readonly logger: LoggerService,
    // @Inject('COMPANY_SERVICE') private readonly company: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    // await this.company.connect();
  }

  @Get()
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'tramite',
  })
  @ApiBearerAuth('access-token')
  public async getTramites(@Response() res) {
    const tramites = await this.service.findAll();
    return res.status(HttpStatus.OK).json(tramites);
  }

  @Post('find')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'tramite',
  })
  public async findTramite(@Response() res, @Body() query: string) {
    const queryCondition = query;
    const tramites = await this.service.findOne(queryCondition);
    return res.status(HttpStatus.OK).json(tramites);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'tramite',
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
    resource: 'tramite',
  })
  @UsePipes(new JoiValidationPipe())
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async create(@Response() res, @Body() updateTramiteDto: CreateTramiteDto) {
    const response = await this.service.create(updateTramiteDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Patch('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    resource: 'tramite',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(
    @Param('id') id: string,
    @Response() res,
    @Body() updateTramiteDto: UpdateTramiteDto,
  ) {
    const response = await this.service.update(id, updateTramiteDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'delete',
    resource: 'tramite',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async delete(@Param('id') id: string, @Response() res) {
    const response = await this.service.delete(id);
    return res.status(HttpStatus.OK).json(response);
  }
}
