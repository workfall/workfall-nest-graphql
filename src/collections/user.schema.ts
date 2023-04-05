import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'user',
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
