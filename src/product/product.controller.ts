import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }
  @Post(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          const filename = Date.now() + file.originalname;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @UploadedFile()
    image: Express.Multer.File,
    @Param('id') id: number,
    @Body() product: CreateProductDto,
    @Req() req: Request,
  ) {
    product.image = 'http://' + req.get('host') + '/uploads/' + image.filename;
    return await this.productService.create(id, product);
  }
  @Put(':id/:categoryid')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          const filename = Date.now() + file.originalname;
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: number,
    @Param('categoryid') categoryId: number,
    @Body() product: UpdateProductDto,
    @Req() req: Request,
  ): Promise<UpdateResult> {
    const oldProduct = await this.productService.getById(id);
    if (image) {
      product.image =
        'http://' + req.get('host') + '/uploads/' + image.filename;
    } else {
      product.image = oldProduct.image;
    }
    return this.productService.update(id, categoryId, product);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
}
