import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('items')
export class Item {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;
}
