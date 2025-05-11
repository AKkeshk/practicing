import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Make sure to import TypeOrmModule
import { CustomerService } from './customer.service'; // Import your service
import { Item } from 'src/schemas/itemSchema';
import { Cart } from 'src/schemas/cartSchema';
import { CustomerController } from './customer.controller';
import { User } from 'src/schemas/userSchema';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item, Cart])], // Register repositories here
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
