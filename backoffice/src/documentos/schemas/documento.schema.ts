import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Documento extends Document {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ required: true, index: { unique: true } })
  email: string;
  @Prop()
  company: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: [{ type: String, enum: ['document', 'admin'] }], default: 'document' })
  roles: [string];
  @Prop({ required: true })
  encode: string;
}

const DocumentoSchema = SchemaFactory.createForClass(Documento);
export { Documento, DocumentoSchema };
