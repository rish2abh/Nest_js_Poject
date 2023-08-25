import { Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService : AuthService) {
        super();
    }
    async canActivate(context: ExecutionContextHost) {
      
        const http = context.switchToHttp();
        const res = http.getResponse();
        const req = http.getRequest();
        // console.log("TEST_HERE_1", req.headers);
        console.log(req.headers.authorization.split(" ")[1],"contecy");
        const validation = await this.authService.validateUser(req.headers.authorization.split(" ")[1])
        return validation ?? false
      }
}
