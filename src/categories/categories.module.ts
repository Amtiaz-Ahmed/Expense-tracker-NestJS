import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { ExpenseCategory } from './models/expense-category.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ExpenseCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
