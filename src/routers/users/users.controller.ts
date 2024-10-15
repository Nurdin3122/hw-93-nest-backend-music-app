import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.shema';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

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
      role: userDto.role || 'user',
    });
    user.generateToken();
    return await user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async loginUser(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('secret')
  async secret(@Req() req: RequestWithUser) {
    const user = req.user as UserDocument;
    return { message: "Secret message ", email:user.email}
  }

  @UseGuards(TokenAuthGuard)
  @Post('logout')
  async logoutUser(@Req() req: RequestWithUser) {
    const user = req.user as UserDocument;
    user.token = '';
    await user.save();

    return { message: 'Successfully logged out' };
  }
}
