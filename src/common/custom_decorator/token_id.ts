import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const ExtractUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    
    const decode = jwt.decode(token);
    const userId = decode.sub;  
    console.log(userId,"userId");
    
    return userId;
  },
);   
   





  







// import { Injectable, Request } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';


// @Injectable()
// export class TokenId {

//   constructor() {}

//   async extract_Id (@Request() req : any) {
//     const token = req.headers.authorization.split(' ')[1];
//       const decode = jwt.decode(token);
//       const id = decode.sub;
      
//       return id
//   }
// }