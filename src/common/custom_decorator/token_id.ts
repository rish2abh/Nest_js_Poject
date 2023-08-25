import { Injectable, Request } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class TokenId {

  constructor() {}

  async extract_Id (@Request() req : any) {
    const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.decode(token);
      const id = decode.sub;
      
      return id
  }
}