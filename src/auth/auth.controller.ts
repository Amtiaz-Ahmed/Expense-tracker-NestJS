import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { loginSchema } from 'src/users/validation/user.schema';
import { Throttle } from '@nestjs/throttler';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  login(
    @Body(new JoiValidationPipe(loginSchema)) body
  ) {
    return this.authService.login(body)
  }

  @Post('logout')
  logout() {
    return { message: 'logout succesfully' }
  }
}
