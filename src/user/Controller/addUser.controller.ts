import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../Service/addUser.service';
import { CreateUserDto, LoginDto } from 'src/common/dto/createUser.dto';
import { JwtAuthGuard } from 'src/common/auth/guards/local.guard';
import { TokenId } from 'src/common/custom_decorator/token_id';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private  tokenId : TokenId ) {}
  
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
  async list(@Request() req: any) {
    try {
    
       let id = await this.tokenId.extract_Id(req)
      const userData = await this.userService.userData(id);
      return userData;
    } catch (error) {
      // Handle errors here
      console.error('Error in list:', error.message);
      throw new Error('Unable to retrieve user data');
    }
  }

}
