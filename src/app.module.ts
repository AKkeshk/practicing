import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './schemas/userSchema';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb', // Specify MongoDB as the database type
      url: 'mongodb+srv://practicingNestJS:practicingNestJS@practicingnestjs.vvbui13.mongodb.net/?retryWrites=true&w=majority&appName=practicingNestJS', // MongoDB URI
      synchronize: true, // Automatically sync database schema on every application launch (use with caution in production)

      entities: [User], // Register entities here
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
