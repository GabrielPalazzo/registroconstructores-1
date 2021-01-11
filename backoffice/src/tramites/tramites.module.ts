import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TramitesController } from './tramites.controller';
import { TramitesService } from './tramites.service';
import { TramiteSchema } from './schemas/tramite.schema';
import { roles } from './tramite.roles';
import { AccessControlModule } from 'nest-access-control';
import { Transport, ClientsModule } from '@nestjs/microservices';

// import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    //AuthModule,
    AccessControlModule.forRoles(roles),
    MongooseModule.forFeature([{ name: 'Tramite', schema: TramiteSchema }]),
    ClientsModule.register([
      // { name: 'COMPANY_SERVICE', transport: Transport.TCP, options : { port: 4042 } },
    ]),
  ],
  controllers: [TramitesController],
  providers: [TramitesService, Logger],
  exports: [
    TramitesService,
    MongooseModule.forFeature([{ name: 'Tramite', schema: TramiteSchema }]),
  ],
})
export class TramitesModule {}
