import { object, string, ObjectSchema, date } from 'joi';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  schema: ObjectSchema;

  constructor() {
    this.schema = object({
      firstName: string(),
      lastName: string(),
      email: string(),
      company: string(),
      password: string(),
      encode: string(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any, _metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
