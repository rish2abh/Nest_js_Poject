    import { Injectable } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { User } from '../Schema/user.schema';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model, Types } from 'mongoose';
    @Injectable()
    export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>
        ) {}

    async genrateToken(data: any) {
        const payload = { sub: data._id, email: data.email };
        return { acessToken: await this.jwtService.signAsync(payload) };
    }
    
    async validateUser(data){
        const payload = this.jwtService.decode(data)
        const objectID = new Types.ObjectId(payload.sub)
        const validate =  await this.userModel.findOne({_id:objectID,token :data})
        return validate ? true :  false
    }
    }
