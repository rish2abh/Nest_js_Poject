import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, VerifyCallback} from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: "155868939967-7mdahg2o2c3ekf4eav45ohip32lg06uf.apps.googleusercontent.com",
            clientSecret: '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',
            callbackURL: 'http://localhost:7000/user/auth/google/callback',
            scope: ['email', 'profile']
        })
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        // console.log(profile,"profile");
        done(null, profile);
        
    }
}