import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Income } from '../income/models/income.model';
import { Expense } from '../expense/models/expense.model';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(Income) private incomeModel: typeof Income,
        @InjectModel(Expense) private expenseModel: typeof Expense,
    ) { }

    async getMonthlyReport(userId: number, year: number, month: number) {
        // Start and End dates for the month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Last day of the month

        // Fetch Incomes
        const incomes = await this.incomeModel.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount), 0);

        // Fetch Expenses
        const expenses = await this.expenseModel.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

        // Daily Breakdown
        const dailyBreakdown = {};
        expenses.forEach(expense => {
            // Assuming expense.date is a Date object or string 'YYYY-MM-DD'
            const dateStr = expense.date instanceof Date
                ? expense.date.toISOString().split('T')[0]
                : expense.date;

            if (!dailyBreakdown[dateStr]) {
                dailyBreakdown[dateStr] = 0;
            }
            dailyBreakdown[dateStr] += Number(expense.amount);
        });

        return {
            period: { year, month },
            totalIncome,
            totalExpense,
            remainingBalance: totalIncome - totalExpense,
            dailyBreakdown,
            transactions: {
                incomes,
                expenses
            }
        };
    }
}
