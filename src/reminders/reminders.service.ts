import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reminder } from './models/reminder.model';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { timeStamp } from 'console';
import { ExpenseCategory } from 'src/categories/models/expense-category.model';


@Injectable()
export class RemindersService {

  constructor(
    @InjectModel(Reminder) private reminderModel: typeof Reminder,
    @InjectModel(ExpenseCategory) private expenseCategoryModel: typeof ExpenseCategory,
  ) { }

  async create(createReminderDto: CreateReminderDto, userId: number) {
    const category = await this.expenseCategoryModel.findOne({
      where: {
        id: createReminderDto.categoryId,
        userId: userId,
      }
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${createReminderDto.categoryId} not found`);
    }

    return this.reminderModel.create({
      userId: userId,
      categoryId: createReminderDto.categoryId,
      title: createReminderDto.title,
      amount: createReminderDto.amount,
      reminderDate: createReminderDto.reminderDate ? new Date(createReminderDto.reminderDate) : null,
      reminderTime: createReminderDto.reminderTime,
      isCompleted: false,
    } as any);
  }

  async findAll(userId: number) {
    return this.reminderModel.findAll({
      where: {
        userId: userId,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number, userId: number) {
    const reminder = await this.reminderModel.findOne({
      where: {
        id, userId
      },
    });
    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return reminder;
  }

  async update(id: number, updateReminderDto: UpdateReminderDto, userId: number) {
    const reminder = await this.findOne(id, userId);

    const updateData: any = {
      categoryId: updateReminderDto.categoryId,
      title: updateReminderDto.title,
      amount: updateReminderDto.amount,
      reminderTime: updateReminderDto.reminderTime,
      isCompleted: updateReminderDto.isCompleted,
    };

    if (updateReminderDto.reminderDate) {
      updateData.reminderDate = new Date(updateReminderDto.reminderDate);
    }

    await reminder.update(updateData);

    return reminder;
  }

  async remove(id: number, userId: number) {
    const reminder = await this.findOne(id, userId);
    await reminder.destroy();
    return { message: 'Reminder deleted successfully' };
  }
}
