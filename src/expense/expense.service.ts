import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './models/expense.model';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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

  findAll() {
    return this.expenseModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
