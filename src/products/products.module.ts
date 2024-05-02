import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductRepository } from './repository/product';
import { ProductResositoryImple } from './repository/repository.imple';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: ProductRepository, useClass: ProductResositoryImple },
  ],
})
export class ProductsModule {}
