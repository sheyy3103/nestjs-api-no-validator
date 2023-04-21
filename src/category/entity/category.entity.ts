/* eslint-disable prettier/prettier */

import { Product } from 'src/product/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
