import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../Service/addUser.service';
import { CreateUserDto, LoginDto } from 'src/common/dto/createUser.dto';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { ExtractUserId } from 'src/common/custom_decorator/token_id';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ) {}
  
  @Post('signUp')
  signUp(@Body() CreateUserDto: CreateUserDto ) {
      return this.userService.createUser(CreateUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto ) {
      return this.userService.login(loginDto);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  list(@ExtractUserId() userId: string) {
      return  this.userService.userData(userId); 
  }

}
