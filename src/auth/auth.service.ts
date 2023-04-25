import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register-auth.dto';
import * as argon from 'argon2';
import { User } from 'src/user/enity/user.enity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(account: RegisterDTO): Promise<User> {
    const hashedPassword = await argon.hash(account.password);
    account.password = hashedPassword.toString();
    return this.userRepository.save(account);
  }
  async setToken(id: number): Promise<{ accessToken: string }> {
    const payload = {
      subject: id,
    };
    const jwtStringToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken: jwtStringToken };
  }
  async login(account: LoginDTO) {
    const acc = await this.userRepository.findOneBy({ email: account.email });
    if (!acc) {
      throw new ForbiddenException('Cannot find user');
    }
    const isMatch = await argon.verify(acc.password, account.password);
    if (!isMatch) {
      throw new ForbiddenException('Password does not match');
    }
    delete acc.password;
    return await this.setToken(acc.id);
  }
}
