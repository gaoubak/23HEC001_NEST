import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDTO.password, salt);

    const user = await this.databaseService.user.create({
      data: {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        password: hashedPassword,
        apiKey: uuid4(),
      },
    });

    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return null; 
    }

    const dataToUpdate: any = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      dataToUpdate.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: {
        ...dataToUpdate,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async updateSecretKey(userId: number, secret: string): Promise<User> {
    return this.databaseService.user.update({
      where: { id: userId },
      data: {
        twoFASecret: secret,
        enable2FA: true,
      },
    });
  }

  async disable2FA(userId: number): Promise<User> {
    return this.databaseService.user.update({
      where: { id: userId },
      data: {
        enable2FA: false,
        twoFASecret: null,
      },
    });
  }

}
