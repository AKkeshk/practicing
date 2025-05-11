import {
  Entity,
  ObjectIdColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ObjectId,
} from 'typeorm';
import { User } from './userSchema';

@Entity('carts')
export class Cart {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  items: ObjectId[]; // Let TypeORM infer type for arrays of ObjectId

  @Column()
  totalPrice: number;

  @ManyToOne(() => User, { nullable: false }) // Define the relation to Customer
  @JoinColumn() // Join the customer reference to the customer table
  user: User; // The customer is now a related entity, not just an ObjectId
}
