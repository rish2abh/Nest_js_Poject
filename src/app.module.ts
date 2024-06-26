import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './common/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    PostCommentModule,
  ],
})
export class AppModule {}
