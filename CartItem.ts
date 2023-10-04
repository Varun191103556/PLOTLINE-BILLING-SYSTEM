import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Service } from "./Service";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartItems, { nullable: false })
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Relation<Product>;

  @ManyToOne(() => Service, (service) => service.cartItems)
  service: Relation<Service>;

  @Column()
  quantity: number;
}
