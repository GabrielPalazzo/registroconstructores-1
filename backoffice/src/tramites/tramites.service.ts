import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { CreateTramiteDto } from './dto/createTramite.dto';
import { Tramite } from './schemas/tramite.schema';
import { UpdateTramiteDto } from './dto/updateTramite.dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class TramitesService {
  constructor(
    @InjectModel('Tramite') private readonly tramiteModel: Model<Tramite>,
    // @Inject('COMPANY_SERVICE') private readonly company: ClientProxy
    ) {}

  async onApplicationBootstrap() {
    // await this.company.connect();
  } 
    
  async findAll(): Promise<Tramite[]> {
    // this.company.emit('CompanyEvent', "Pablo")
    return await this.tramiteModel.find();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findOne(options: any): Promise<Tramite> {
    return await this.tramiteModel.findOne(options);
  }

  async findById(ID: string){

    var tramite = await this.tramiteModel.findById(ID);
    var company;

    
    /*
    await this.company
      .send('getById', tramite.company)
      .subscribe(result => {
        company = result;
        Logger.log(`${tramite.firstName}, es empleado de ${company.title}`)
      })
    */
    return tramite;
  }

  async create(createTramiteDto: CreateTramiteDto): Promise<Tramite> {
    const salt = randomBytes(16).toString('hex');

    createTramiteDto.password = pbkdf2Sync(
      createTramiteDto.password,
      salt,
      1000,
      64,
      `sha512`,
    ).toString(`hex`);
    const createdTramite = new this.tramiteModel(createTramiteDto);
    return await createdTramite.save();
  }

  async update(ID: string, newValue: UpdateTramiteDto): Promise<Tramite> {
    const tramite = await this.tramiteModel.findById(ID).exec();

    if (!tramite._id) {
      debug('tramite not found');
    }

    await this.tramiteModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.tramiteModel.findById(ID).exec();
  }
  async delete(ID: string): Promise<string> {
    try {
      await this.tramiteModel.findByIdAndRemove(ID).exec();
      return 'The tramite has been deleted';
    } catch (err) {
      debug(err);
      return 'The tramite could not be deleted';
    }
  }
}
