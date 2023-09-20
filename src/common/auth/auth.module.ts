import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schema/user.schema';
import { GoogleStrategy } from './google.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SNFNN@#$%!@',
      signOptions: { expiresIn: '1h' },
      
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy,GoogleStrategy],
  exports: [AuthService, JwtStrategy,GoogleStrategy],
})
export class AuthModule {}
