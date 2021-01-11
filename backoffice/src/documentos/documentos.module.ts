import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentosController } from './documentos.controller';
import { DocumentosService } from './documentos.service';
import { DocumentoSchema } from './schemas/documento.schema';
import { roles } from './documento.roles';
import { AccessControlModule } from 'nest-access-control';
import { Transport, ClientsModule } from '@nestjs/microservices';

// import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    //AuthModule,
    AccessControlModule.forRoles(roles),
    MongooseModule.forFeature([{ name: 'Documento', schema: DocumentoSchema }]),
    ClientsModule.register([
      // { name: 'COMPANY_SERVICE', transport: Transport.TCP, options : { port: 4042 } },
    ]),
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService, Logger],
  exports: [
    DocumentosService,
    MongooseModule.forFeature([{ name: 'Documento', schema: DocumentoSchema }]),
  ],
})
export class DocumentosModule {}
