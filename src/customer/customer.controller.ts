import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { cartDTO } from './dtos/cart.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('addItemsToCart')
  async addItemsToCart(@Body() cartDTO: cartDTO) {
    await this.customerService.addItemsToCart(cartDTO);
  }
}
