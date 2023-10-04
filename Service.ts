import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";
import { ColumnNumericTransformer } from "../common/numericTransformer";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
  })
  name: string;

  @Column("decimal", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.service)
  cartItems: Relation<CartItem[]>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.service)
  orderItems: Relation<OrderItem[]>;
}
