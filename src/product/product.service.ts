import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }
  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: [{ id: id }],
      relations: ['category'],
    });
  }
  async create(id: number, product: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    const newProduct = this.productRepository.create({ ...product, category });
    return this.productRepository.save(newProduct);
  }
  async update(
    id: number,
    categoryId: number,
    product: UpdateProductDto,
  ): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const newProduct = this.productRepository.create({ ...product, category });
    return this.productRepository.update(id, newProduct);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
