import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";
import { Service } from "./Service";
import { ColumnNumericTransformer } from "../common/numericTransformer";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Relation<Product>;

  @ManyToOne(() => Service, (service) => service.orderItems)
  service: Relation<Service>;

  @Column()
  quantity: number;

  @Column("decimal", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column("decimal", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  tax: number;
}
