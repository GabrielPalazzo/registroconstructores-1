import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { CreateDocumentoDto } from './dto/createDocumento.dto';
import { Documento } from './schemas/documento.schema';
import { UpdateDocumentoDto } from './dto/updateDocumento.dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class DocumentosService {
  constructor(
    @InjectModel('Documento') private readonly documentoModel: Model<Documento>,
    // @Inject('COMPANY_SERVICE') private readonly company: ClientProxy
    ) {}

  async onApplicationBootstrap() {
    // await this.company.connect();
  } 
    
  async findAll(): Promise<Documento[]> {
    // this.company.emit('CompanyEvent', "Pablo")
    return await this.documentoModel.find();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findOne(options: any): Promise<Documento> {
    return await this.documentoModel.findOne(options);
  }

  async findById(ID: string){

    var documento = await this.documentoModel.findById(ID);
    var company;

    
    /*
    await this.company
      .send('getById', documento.company)
      .subscribe(result => {
        company = result;
        Logger.log(`${documento.firstName}, es empleado de ${company.title}`)
      })
    */
    return documento;
  }

  async create(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
    const salt = randomBytes(16).toString('hex');

    createDocumentoDto.password = pbkdf2Sync(
      createDocumentoDto.password,
      salt,
      1000,
      64,
      `sha512`,
    ).toString(`hex`);
    const createdDocumento = new this.documentoModel(createDocumentoDto);
    return await createdDocumento.save();
  }

  async update(ID: string, newValue: UpdateDocumentoDto): Promise<Documento> {
    const documento = await this.documentoModel.findById(ID).exec();

    if (!documento._id) {
      debug('documento not found');
    }

    await this.documentoModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.documentoModel.findById(ID).exec();
  }
  async delete(ID: string): Promise<string> {
    try {
      await this.documentoModel.findByIdAndRemove(ID).exec();
      return 'The documento has been deleted';
    } catch (err) {
      debug(err);
      return 'The documento could not be deleted';
    }
  }
}
