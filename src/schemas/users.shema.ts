import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';

export interface UserMethods {
  generateToken: () => void;
  checkPassword: (password: string) => Promise<boolean>;
}
export type UserDocument = User & Document & UserMethods;
const SALT_WORK_FACTOR = 10;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default:null })
  token: string;

  @Prop()
  displayName: string;

  @Prop({ required: true, default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.methods.checkPassword = function (password) {
  return compare(password, this.password);
};

UserSchema.pre<UserDocument>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await genSalt(SALT_WORK_FACTOR);
  this.password = await hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});
