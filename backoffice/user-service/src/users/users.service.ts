import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject('COMPANY_SERVICE') private readonly company: ClientProxy
    ) {}

  async onApplicationBootstrap() {
    await this.company.connect();
  } 
    
  async findAll(): Promise<User[]> {
    this.company.emit('CompanyEvent', "Pablo")
    return await this.userModel.find();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findOne(options: any): Promise<User> {
    return await this.userModel.findOne(options);
  }

  async findById(ID: string){

    var user = await this.userModel.findById(ID);
    var company;

    

    await this.company
      .send('getById', user.company)
      .subscribe(result => {
        company = result;
        Logger.log(`${user.firstName}, es empleado de ${company.title}`)
      })

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = randomBytes(16).toString('hex');

    createUserDto.password = pbkdf2Sync(
      createUserDto.password,
      salt,
      1000,
      64,
      `sha512`,
    ).toString(`hex`);
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(ID: string, newValue: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(ID).exec();

    if (!user._id) {
      debug('user not found');
    }

    await this.userModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.userModel.findById(ID).exec();
  }
  async delete(ID: string): Promise<string> {
    try {
      await this.userModel.findByIdAndRemove(ID).exec();
      return 'The user has been deleted';
    } catch (err) {
      debug(err);
      return 'The user could not be deleted';
    }
  }
}
