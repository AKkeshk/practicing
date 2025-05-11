import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/schemas/cartSchema';
import { Item } from 'src/schemas/itemSchema';
import { MongoRepository } from 'typeorm';
import { cartDTO } from './dtos/cart.dto';
import { ObjectId } from 'mongodb';
import { User } from 'src/schemas/userSchema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(User)
    private customerRepo: MongoRepository<User>, // to find users

    @InjectRepository(Item)
    private itemRepo: MongoRepository<Item>,

    @InjectRepository(Cart)
    private cartRepo: MongoRepository<Cart>,
  ) {}

  async getItems() {
    const findItems = await this.itemRepo.find();
    if (findItems.length <= 0) {
      throw new BadRequestException('no items found');
    }
    return findItems;
  }

  async addItemsToCart(cartDTO: cartDTO) {
    const { user, totalPrice, items } = cartDTO;
    const getItems = await this.itemRepo.find({
      where: {
        _id: { $in: items.map((id) => new ObjectId(id)) },
      },
    });
    const calculatedTotalPrice = getItems.reduce(
      (acc, item) => acc + item.price,
      0,
    );
    const finalTotalPrice = totalPrice || calculatedTotalPrice;

    const createCart = this.cartRepo.create({
      user,
      items,
      totalPrice: finalTotalPrice,
    });
    await this.cartRepo.save(createCart);

    return {
      message: 'Items added to cart successfully',
      totalPrice: finalTotalPrice,
    };
  }
}
