import { IsString, IsNumber } from 'class-validator';

export class itemDTO {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  image?: Buffer;
}
