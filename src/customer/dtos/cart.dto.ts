import { IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'typeorm';

export class cartDTO {
  user: ObjectId;

  @IsNumber()
  totalPrice: number;

  items: ObjectId[];
}
