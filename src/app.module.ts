import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './schemas/userSchema';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { Item } from './schemas/itemSchema';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { Cart } from './schemas/cartSchema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb', // Specify MongoDB as the database type
      url: 'mongodb+srv://practicingNestJS:practicingNestJS@practicingnestjs.vvbui13.mongodb.net/?retryWrites=true&w=majority&appName=practicingNestJS', // MongoDB URI
      synchronize: true, // Automatically sync database schema on every application launch (use with caution in production)

      entities: [User, Item, Cart], // Register entities here
    }),
    AdminModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
