import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Income } from './models/income.model';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {

  constructor(@InjectModel(Income) private readonly incomeModel: typeof Income) { }

  async create(createIncomeDto: CreateIncomeDto, userId: number) {

    const income = await this.incomeModel.create({
      userId: userId,
      amount: createIncomeDto.amount,
      date: createIncomeDto.incomeDate ? new Date(createIncomeDto.incomeDate) : new Date(),
      description: createIncomeDto.description,
    } as any);

    return income;
  }

  async findAll(userId: number) {
    return this.incomeModel.findAll({ where: { userId }, order: [["date", "DESC"]] });
  }

  async findOne(id: number, userId: number) {
    const income = await this.incomeModel.findOne({
      where: { userId, id },

    })
    if (!income) {
      throw new NotFoundException(`Income   with id ${id} not found`)
    }
    return income;
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto, userId: number) {
    const income = await this.findOne(id, userId);

    const updateData: any = {
      source: updateIncomeDto.source,
      amount: updateIncomeDto.amount,
      description: updateIncomeDto.description,
    }

    if (updateIncomeDto.incomeDate) {
      updateData.date = new Date(updateIncomeDto.incomeDate);
    }
    return await income.update(updateData);
  }

  async remove(id: number, userId: number) {
    const income = await this.findOne(id, userId);
    await income.destroy();
    return { message: "Income deleted successfully" };
  }
}
