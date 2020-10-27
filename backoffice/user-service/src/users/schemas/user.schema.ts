import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class User extends Document {
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
  @Prop({ type: [{ type: String, enum: ['user', 'admin'] }], default: 'user' })
  roles: [string];
  @Prop({ required: true })
  encode: string;
}

const UserSchema = SchemaFactory.createForClass(User);
export { User, UserSchema };
