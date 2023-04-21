/* eslint-disable prettier/prettier */
import { Category } from 'src/category/entity/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'float' })
  cost: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
