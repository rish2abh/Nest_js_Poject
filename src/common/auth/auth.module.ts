import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schema/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/local.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SNFNN@#$%!@',
      signOptions: { expiresIn: '1hr' },
      
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
