import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService
    ) { }

    async login(data: any) {
        const user = await this.userModel.findOne({
            where: {
                email: data?.email
            }
        })
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const match = await bcrypt.compare(data?.password, user?.password);

        if (!match) {
            throw new BadRequestException('Invalid credentials');
        }

        const payload = {
            userId: user?.id,
            email: user?.email
        }

        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}
