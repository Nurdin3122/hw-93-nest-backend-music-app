import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.shema';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user: UserDocument;
}

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

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async loginUser(@Req() req: RequestWithUser) {
    return req.user;
  }
}
