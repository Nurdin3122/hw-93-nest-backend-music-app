import { Body, Controller, Post } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.shema';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  async registerUser(@Body() userDto: CreateUserDto) {
    const user = new this.userModel({
      email: userDto.email,
      password: userDto.password,
      displayName: userDto.displayName,
    });
    user.generateToken();
    return await user.save();
  }
}
