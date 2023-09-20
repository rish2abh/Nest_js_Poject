import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from '../Service/addUser.service';
import { CreateUserDto, LoginDto } from 'src/common/dto/createUser.dto';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { ExtractUserId } from 'src/common/custom_decorator/token_id';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async Google(@Req() req) {
    
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async GoogleSignUp(@Req() req) {
      console.log(req.user,"req");
    return this.userService.googleSignUp(req)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  list(@ExtractUserId() userId: string) {
    return this.userService.userData(userId);
  }
}
