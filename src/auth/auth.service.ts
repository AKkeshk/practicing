import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/schemas/userSchema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: MongoRepository<User>, // to find users

    private jwtService: JwtService, // to generate JWT tokens
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName } = createUserDto;

    const userExists = await this.userRepo.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Email is already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepo.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await this.userRepo.save(newUser);
    return { message: 'User successfully created' };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const email = googleUser;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) return user;
    else {
      const createUser = this.userRepo.create(googleUser);
      return this.userRepo.save(createUser);
    }
  }

  async loginWithGoogle(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
