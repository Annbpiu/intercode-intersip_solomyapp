import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository {
  private userRepository: Repository<User>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
