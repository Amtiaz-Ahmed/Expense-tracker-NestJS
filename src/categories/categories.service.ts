import { Injectable, NotAcceptableException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExpenseCategory } from './models/expense-category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Expense } from 'src/expense/models/expense.model';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(ExpenseCategory)
    private readonly categoryModel: typeof ExpenseCategory,
  ) { }

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    return this.categoryModel.create({
      ...createCategoryDto,
      userId,
    } as any)
  }

  async findAll(userId: number) {
    return this.categoryModel.findAll({
      where: { userId },
      order: [['name', 'ASC']],
    });
  }

  async findOne(id: number, userId: number) {
    const category = await this.categoryModel.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotAcceptableException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, userId: number) {
    const category = await this.findOne(id, userId);
    await category.update(updateCategoryDto);
    return category;
  }

  async remove(id: number, userId: number) {
    const category = await this.findOne(id, userId);

    const income = await Expense.findOne({
      where: { categoryId: id }
    })

    if (income) {
      throw new ConflictException("Category is already used in an expense");
    }

    await category.destroy();
    return "Category Deleted successfully";
  }
}
