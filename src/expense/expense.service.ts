import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './models/expense.model';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { where } from 'sequelize';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense)
    private expenseModel: typeof Expense,
  ) { }
  async create(createExpenseDto: CreateExpenseDto) {
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
