import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Tramite extends Document {
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
  @Prop({ type: [{ type: String, enum: ['tramite', 'admin'] }], default: 'tramite' })
  roles: [string];
  @Prop({ required: true })
  encode: string;
}

const TramiteSchema = SchemaFactory.createForClass(Tramite);
export { Tramite, TramiteSchema };
