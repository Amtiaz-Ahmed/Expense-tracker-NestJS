import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { loginSchema } from 'src/users/validation/user.schema';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
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
