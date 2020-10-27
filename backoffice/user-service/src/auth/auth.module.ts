import { Module, Logger } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// Strategies
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, Logger],
  exports: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class AuthModule {}
