import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Body, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Schema/user.schema';
import { Model } from 'mongoose';
// import { jwtConstants } from './constants';

@Injectable()
// export class LocalAuthGuard extends AuthGuard('local')
export class JwtStrategy extends PassportStrategy(Strategy) {
 
  
  constructor(private authService: AuthService,

      ) 
    {      
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest:ExtractJwt.fromExtractors([
      //   JwtStrategy.getToken,
      //   // ExtractJwt.fromAuthHeaderAsBearerToken()
      // ]),
      ignoreExpiration: false,
      secretOrKey: 'SNFNN@#$%!@',
    });
  }

  // async validate(data: any, payload:any): Promise<any> { 
  //   // const token = this.authService.extractTokenFromRequest(req);
  //   // console.log(token, 'Extracted token');
  //   // const token = await geToken
  //   // const token = await this

  //   // const user = await this.authService.validateUser(data);

  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //     // }
  //     console.log(payload);

  //   return null;
  // }
  // static getToken(@Request() req:any): string | null {  
  
  //    const token = req.headers.authorization.split(" ")[1]
 
  //   // if(!decode) {
  //   //   throw new UnauthorizedException();
  //   // }
  
  //   return token
  // }

}
