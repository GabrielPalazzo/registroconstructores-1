import { LoggerService, Inject, Injectable, Logger } from '@nestjs/common';
import { PassportLocalModel } from 'passport-local-mongoose';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { pbkdf2Sync } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const filter = { email: email };
    this.logger.log('Validando!');
    const foundUser = await this.userModel.findOne(filter);
    this.logger.log(filter.email);
    if (
      password &&
      !(
        foundUser.password ===
        pbkdf2Sync(password, foundUser.encode, 1000, 64, `sha512`).toString(
          `hex`,
        )
      )
    )
      return null;

    if (foundUser) this.logger.log('Encontrado! ' + foundUser.email);
    return foundUser;
  }
}
