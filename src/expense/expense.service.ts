import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './models/expense.model';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { User } from 'src/users/models/user.model';
import { ExpenseCategory } from 'src/categories/models/expense-category.model';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense)
    private expenseModel: typeof Expense,
  ) { }
  async create(createExpenseDto: CreateExpenseDto) {

    const user = await User.findOne({ where: { id: createExpenseDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createExpenseDto.userId} not found`);
    }

    const category = await ExpenseCategory.findOne({ where: { id: createExpenseDto.categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createExpenseDto.categoryId} not found`);
    }

    return this.expenseModel.create({
      userId: createExpenseDto.userId,
      categoryId: createExpenseDto.categoryId,
      amount: createExpenseDto.amount,
      date: new Date(createExpenseDto.date),
      description: createExpenseDto.description,
    } as any);
  }

  findAll(userId: number) {
    return this.expenseModel.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });
  }

  async findOne(id: number, userId: number) {
    const expense = await this.expenseModel.findOne({
      where: { id, userId }
    })
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }


  async update(id: number, updateExpenseDto: UpdateExpenseDto, userId: number) {
    const expense = await this.findOne(id, userId);

    const updateData: any = {
      categoryId: updateExpenseDto.categoryId,
      amount: updateExpenseDto.amount,
      description: updateExpenseDto.description,
    }

    if (updateExpenseDto.date) {
      updateData.date = new Date(updateExpenseDto.date);
    }
    await expense.update(updateData);
    return expense;
  }

  async remove(id: number, userId: number) {
    const expense = await this.findOne(id, userId);
    await expense.destroy();
    return { message: 'Expense deleted successfully' };
  }
}
