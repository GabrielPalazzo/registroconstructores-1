import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { roles } from './user.roles';
import { AccessControlModule } from 'nest-access-control';
import { Transport, ClientsModule } from '@nestjs/microservices';

// import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    //AuthModule,
    AccessControlModule.forRoles(roles),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.register([
      { name: 'COMPANY_SERVICE', transport: Transport.TCP, options : { port: 4042 } },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UsersModule {}
