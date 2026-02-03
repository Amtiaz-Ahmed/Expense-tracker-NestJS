import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { Reminder } from './models/reminder.model';
import { SequelizeModule } from '@nestjs/sequelize';

import { ExpenseCategory } from 'src/categories/models/expense-category.model';

@Module({
  imports: [SequelizeModule.forFeature([Reminder, ExpenseCategory])],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule { }
