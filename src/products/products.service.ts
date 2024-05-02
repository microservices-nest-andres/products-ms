import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(private productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit } = paginationDto;
    const page = (paginationDto.page - 1) * limit;
    const totalPages = await this.productRepository.count();
    const products = await this.productRepository.findAll(limit, page);
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: products,
      meta: {
        total: totalPages,
        page: paginationDto.page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepository.remove(id);
  }
}
