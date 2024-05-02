import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDtoOutPut } from '../dto/product.dto.output';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductResositoryImple implements ProductRepository {
  constructor(private prismaService: PrismaService) {}
  remove(id: number): Promise<ProductDtoOutPut> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        available: false,
      },
    });
  }
  update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: __, ...res } = updateProductDto;
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: res,
    });
  }
  findOne(id: number): Promise<ProductDtoOutPut | null> {
    return this.prismaService.product.findUnique({
      where: {
        id: id,
        available: true,
      },
    });
  }

  async findAll(limit: number, page: number): Promise<ProductDtoOutPut[]> {
    return this.prismaService.product.findMany({
      take: limit,
      skip: page,
      where: {
        available: true,
      },
    });
  }
  count(): Promise<number> {
    return this.prismaService.product.count({
      where: {
        available: true,
      },
    });
  }

  create(product: CreateProductDto): Promise<ProductDtoOutPut> {
    return this.prismaService.product.create({
      data: product,
    });
  }
}
