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
import { UpdateDocumentoDto } from './dto/updateDocumento.dto';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/createDocumento.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from './joi/documento.joi';
import { ClientProxy } from '@nestjs/microservices';


@ApiTags('documentos')
@Controller('documentos')
export class DocumentosController {
  constructor(
    private readonly service: DocumentosService,
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
    resource: 'documentos',
  })
  @ApiBearerAuth('access-token')
  public async getDocumentos(@Response() res) {
    const documentoss = await this.service.findAll();
    return res.status(HttpStatus.OK).json(documentoss);
  }

  @Post('find')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'documentos',
  })
  public async findDocumento(@Response() res, @Body() query: string) {
    const queryCondition = query;
    const documentoss = await this.service.findOne(queryCondition);
    return res.status(HttpStatus.OK).json(documentoss);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    resource: 'documentos',
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
    resource: 'documentos',
  })
  @UsePipes(new JoiValidationPipe())
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async create(@Response() res, @Body() updateDocumentoDto: CreateDocumentoDto) {
    const response = await this.service.create(updateDocumentoDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Patch('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    resource: 'documentos',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(
    @Param('id') id: string,
    @Response() res,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    const response = await this.service.update(id, updateDocumentoDto);
    return res.status(HttpStatus.OK).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete('/:id')
//  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'delete',
    resource: 'documentos',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async delete(@Param('id') id: string, @Response() res) {
    const response = await this.service.delete(id);
    return res.status(HttpStatus.OK).json(response);
  }
}
