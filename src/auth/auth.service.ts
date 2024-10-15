import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.shema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if(!user){
      return null;
    }

    const isCorrectPassword = await user.checkPassword(password);

    if(!isCorrectPassword) {
      return null;
    }

    return user;
  }
}
