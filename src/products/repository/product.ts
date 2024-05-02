import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDtoOutPut } from '../dto/product.dto.output';
import { UpdateProductDto } from '../dto/update-product.dto';

export abstract class ProductRepository {
  abstract create(product: CreateProductDto): Promise<ProductDtoOutPut>;
  abstract findAll(limit: number, page: number): Promise<ProductDtoOutPut[]>;
  abstract count(): Promise<number>;
  abstract findOne(id: number): Promise<ProductDtoOutPut | null>;
  abstract update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto>;
  abstract remove(id: number): Promise<ProductDtoOutPut>;
}
