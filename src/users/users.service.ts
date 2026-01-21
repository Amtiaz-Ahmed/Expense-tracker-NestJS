import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userModel: typeof User) { }


  async register(data: any) {
    const exists = await this.userModel.findOne({
      where: {
        email: data?.email,
      }
    })

    if (exists) {
      throw new BadRequestException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(data?.password, 10);

    await this.userModel.create({
      ...data,
      password: hashedPassword,
    })

    return {
      message: "User Registered Successfully"
    };
  }

}


//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all users`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
