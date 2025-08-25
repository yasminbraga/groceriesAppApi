import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseProductDto } from './dto/response-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  // create(requestProductDto: RequestProductDto) {
  //   return 'This action adds a new product';
  // }

  // findAll() {
  //   return `This action returns all products`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  async update(id: number, responseProductDto: ResponseProductDto) {
    return await this.productRepository.update(id, responseProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
