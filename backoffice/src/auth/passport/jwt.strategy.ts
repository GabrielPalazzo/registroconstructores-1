import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from '../interfaces/user.interface';
import { PassportLocalModel } from 'passport-local-mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(
    payload: JwtPayload,
    done: (error: Error, user: PassportLocalModel<IUser> | false) => any,
  ) {
    const user = await this.authService.validateUser(payload.email, null);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
