import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Income } from '../income/models/income.model';
import { Expense } from '../expense/models/expense.model';

@Module({
    imports: [SequelizeModule.forFeature([Income, Expense])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
